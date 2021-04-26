import "twin.macro";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import merge from "deepmerge";
import { Divider, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { DotsThree } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

import { withLayout } from "utils/layout";
import {
    addApolloState,
    separateApolloCacheFromProps,
    initializeApollo,
    combineMerge,
} from "utils/apollo";

import query from "./gql/availability.gql";
import About from "./about";

import { UserPageLayout } from ".";

type TimesProps = {
    times: string[];
    selected: number;
    handleSelected: Dispatch<SetStateAction<number>>;
};
function Times(props: TimesProps) {
    const [timesSelected, setTimesSelected] = useState([]);

    return (
        <VStack>
            {props.times.map((time: string) =>
                time ? (
                    <Button
                        key={time}
                        variant="outline"
                        width="20"
                        onClick={() => props.handleSelected(props.selected + 1)}>
                        {time}
                    </Button>
                ) : (
                    <Text>No Times Available</Text>
                )
            )}
        </VStack>
    );
}

type WeekProps = {
    weekTimes: { [key: string]: string[] };
    selected: number;
    handleSelected: Dispatch<SetStateAction<number>>;
};
function Week(props: WeekProps) {
    return (
        <Grid templateColumns="repeat(14, 1fr)" gap={8}>
            {Object.entries(props.weekTimes).map((wt, i) => (
                <>
                    <VStack key={wt[0]}>
                        <Text tw="mt-10" fontSize="large" fontWeight="bold">
                            {wt[0]}
                        </Text>
                        <Times
                            tw="mt-10"
                            times={wt[1]}
                            selected={props.selected}
                            handleSelected={props.handleSelected}
                        />
                    </VStack>
                    {i < 6 ? <Divider tw="mt-10" orientation="vertical" /> : null}
                </>
            ))}
        </Grid>
    );
}

type TopBarProps = {
    selected: number;
};
function TopBar(props: TopBarProps) {
    return (
        <HStack spacing={480}>
            <HStack spacing={12}>
                <Heading>Availability</Heading>
                <HStack spacing={2}>
                    <Text fontSize="xs" fontWeight="bold">
                        This Week
                    </Text>
                    <DotsThree fontWeight="bold" size={28} />
                </HStack>
            </HStack>

            <HStack spacing={12}>
                <Text fontSize="xs" fontWeight="bold">
                    {props.selected} Selected
                </Text>
                <Button onClick={() => null} width="40">
                    Book Now
                </Button>
            </HStack>
        </HStack>
    );
}

type AvailabilityProps = {
    username: string;
};
const Availability = withLayout(UserPageLayout, function ({ username }: AvailabilityProps) {
    const [selected, setSelected] = useState(0);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Get the weekAvailability data
    const { data } = useQuery(query, { variables: { username } });
    const user = data.users[0];
    const { weekAvailability } = user;
    const weekAvailabilityClean: { [key: string]: string[] } = {};

    // Arrange the weekAvailability data recieved from the query
    weekDays.map((wd) => (weekAvailabilityClean[wd] = []));
    weekAvailability.map((a: { dayName: string; availableAt: string }) => {
        if (weekAvailabilityClean[a.dayName])
            weekAvailabilityClean[a.dayName].push(a.availableAt.slice(0, 5)); // Gets rid of trailing seconds
    });

    return (
        <VStack>
            <TopBar selected={selected} />
            <Week
                weekTimes={weekAvailabilityClean}
                selected={selected}
                handleSelected={setSelected}
            />
        </VStack>
    );
});

export default Availability;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */
type Params = { username: string };

export const getStaticProps: GetStaticProps<AvailabilityProps, Params> = async (context) => {
    // Null guard
    if (context.params == undefined) {
        return { notFound: true };
    }

    // Query data specially for this route
    const { username } = context.params;
    const client = initializeApollo();
    await client.query({ query, variables: { username } });

    // Get return props from layout data fetching method and extract cache from layout props if any
    const result = (await About.retrievePropsFromLayoutDataRequirement(context)) ?? {};
    const [layoutApolloCache, layoutProps] = separateApolloCacheFromProps(result);

    // Extract the cache from the most recent query and combine it with the cache from the layout dependency
    if (layoutApolloCache) {
        const mergeOption = { arrayMerge: combineMerge };
        const mergedCache = merge(layoutApolloCache, client.extract(), mergeOption);
        client.restore(mergedCache);
    }

    // Send the merged cache together with props for layout and this page
    return addApolloState(client, {
        props: {
            username,
            layoutProps,
        },
    });
};

// Use the same static paths as main layout
export { getStaticPaths } from "./index";
