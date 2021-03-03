import "twin.macro";
import { useState, useEffect } from "react";
import {
    Heading,
    Box,
    HStack,
    Grid,
    Text,
    Link,
    GridProps,
    VStack,
    LinkBox,
    LinkOverlay,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";
import { X } from "phosphor-react";
import axios from "axios";
import { times } from "lodash";

import { FilterSidebar } from "components/pages/MentorListing";
import { MentorCard } from "components/modules/MentorCard";
import { NavBar } from "components/modules/NavBar";
import { useScreen } from "hooks";
import { Mentor, Article } from "models";

/* -------------------------------------------------------------------------- */
/*                               Mentor Results                               */
/* -------------------------------------------------------------------------- */

function DisplayResult({ searchQuery }: { searchQuery: string }) {
    const [mentors, setMentors] = useState<Mentor[] | null>(null);
    useEffect(() => {
        axios
            .get<Mentor[]>("/api/mentors", { params: { searchQuery } })
            .then((response) => setMentors(response.data));
    }, [searchQuery]);

    return (
        <Box tw="h-full w-full">
            <Grid tw="justify-start items-center gap-x-4 gap-y-1" mb={8}>
                <Text tw="text-xl inline font-semibold">Search Results For “programming”</Text>
                <Link tw="text-sm flex" href="/mentor" gridColumn={2}>
                    <X size={20} /> Clear All Filters
                </Link>
                <div tw="text-secondary uppercase">{mentors?.length} Results</div>
            </Grid>
            <VStack spacing={8}>
                {mentors == null ? (
                    <VStack alignItems="stretch" spacing={8} w="full">
                        {times(6, (i) => (
                            <Box
                                key={i}
                                padding="6"
                                boxShadow="lg"
                                bg="white"
                                h="350px"
                                flexGrow={1}
                                w="full">
                                <SkeletonCircle size="10" />
                                <SkeletonText mt="4" noOfLines={4} spacing="4" />
                            </Box>
                        ))}
                    </VStack>
                ) : (
                    mentors.map(({ firstname, lastname, ...rest }) => (
                        <MentorCard
                            key={firstname + lastname}
                            fullname={`${firstname} ${lastname}`}
                            {...rest}
                            variant="desktop"
                        />
                    ))
                )}
            </VStack>
        </Box>
    );
}

function ArticleSection() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        axios.get<Article[]>("/api/articles").then((response) => setArticles(response.data));
    }, []);

    return (
        <HStack
            gridArea="banner"
            justify="space-between"
            alignItems="stretch"
            bg="white"
            p={8}
            rounded="md"
            spacing={4}
            shadow="lg">
            <div tw="flex items-start flex-grow whitespace-nowrap">
                <Heading as="h6" size="md">
                    Trending Topics
                </Heading>
            </div>
            {articles.map((article, i) => (
                <LinkBox as="article" key={i}>
                    <Text tw="text-sm">{article.author}</Text>
                    <LinkOverlay fontWeight="semibold" fontSize="md" href="#">
                        {article.title}
                    </LinkOverlay>
                </LinkBox>
            ))}
        </HStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                             Mentor Listing Page                            */
/* -------------------------------------------------------------------------- */

export default function MentorListing() {
    const { min } = useScreen();

    const desktopLayout: GridProps = {
        templateAreas: `
            "banner banner"
            "sidebar results"
        `,
        templateRows: "150px 1fr",
        templateColumns: "200px 1fr",
    };

    const mobileLayout: GridProps = {
        templateAreas: `
            "results"
        `,
        templateRows: "1fr",
        templateColumns: "minmax(0,1fr)",
    };

    const gridLayout = min`md` ? desktopLayout : mobileLayout;

    return (
        // Setting the height=100vh and overflow=hidden get rid of the scrollbar
        // Using minmax(0, 1fr) gives the children physical dimensions take takes up the rest of
        // space. This issue is documented here: https://stackoverflow.com/questions/52861086/who-does-minmax0-1fr-work-for-long-elements-while-1fr-doesnt
        <Grid gridTemplateRows="max-content minmax(0, 1fr)" background="trueGray.100" gap={8}>
            <Box tw="sticky top-0 z-50">
                <NavBar username="John" />
            </Box>
            <Grid {...gridLayout} w="full" maxWidth="container.lg" mx="auto" gap={8}>
                {/* Banner */}
                {min`md` && <ArticleSection />}

                {/* Filter sidebar */}
                {min`md` && (
                    <VStack gridArea="sidebar" justify="start">
                        <div tw="shadow-lg">
                            <FilterSidebar />
                        </div>
                    </VStack>
                )}

                {/* Results */}
                <Box gridArea="results">
                    <DisplayResult searchQuery={"Get input from user"} />
                </Box>
            </Grid>
        </Grid>
    );
}
