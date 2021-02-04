import "twin.macro";
import { Box, HStack, Grid, Text, Link, VStack } from "@chakra-ui/react";
import { shuffle, times } from "lodash";
import { X } from "phosphor-react";

import { FilterSidebar, MentorCard } from "components/pages/MentorListing";
import { NavBar } from "components/modules/NavBar";
import { useScreen } from "hooks";

/* -------------------------------------------------------------------------- */
/*                                  Mock Data                                 */
/* -------------------------------------------------------------------------- */

const avatarPaths = shuffle(times(16))
    .slice(0, 12)
    .map((i) => `/svg/avatar-${i}.svg`);

const resultCount = 32;

/* -------------------------------------------------------------------------- */
/*                               Mentor Results                               */
/* -------------------------------------------------------------------------- */

function Results() {
    return (
        <Box tw="h-full w-full" overflow="scroll">
            <Grid tw="justify-start items-center p-8 gap-x-4 gap-y-1">
                <Text tw="text-xl inline font-medium">Search Results For “programming”</Text>
                <Link tw="text-sm flex" href="/mentor" gridColumn={2}>
                    <X size={20} /> Clear All Filters
                </Link>
                <div tw="text-secondary uppercase">{resultCount} Results</div>
            </Grid>
            <Grid
                tw="gap-4 w-full items-center"
                p={[4, 8]}
                justifyItems="center"
                justifyContent="center"
                templateColumns="repeat(auto-fit, minmax(375px, 1fr))">
                {avatarPaths.map((image) => (
                    <MentorCard key={image} image={image} />
                ))}
            </Grid>
        </Box>
    );
}

/* -------------------------------------------------------------------------- */
/*                             Mentor Listing Page                            */
/* -------------------------------------------------------------------------- */

export default function MentorListing() {
    const { min } = useScreen();
    return (
        // Setting the height=100vh and overflow=hidden get rid of the scrollbar
        // Using minmax(0, 1fr) gives the children physical dimensions take takes up the rest of
        // space. This issue is documented here: https://stackoverflow.com/questions/52861086/who-does-minmax0-1fr-work-for-long-elements-while-1fr-doesnt
        <Grid
            tw="h-screen overflow-hidden"
            gridTemplateRows="max-content minmax(0, 1fr)"
            background="trueGray.100">
            <NavBar name="John" />
            <HStack alignItems="start">
                {min`sm` && <FilterSidebar />}
                <Results />
            </HStack>
        </Grid>
    );
}
