import "twin.macro";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import merge from "deepmerge";
import { Divider, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { DotsThree } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
    weekTimes: { [key: string]: [{ time: string; selected: boolean }] };
    times: [{ time: string; selected: boolean }];
    day: string;
    handleWeekTimes: Dispatch<
        SetStateAction<{ [key: string]: [{ time: string; selected: boolean }] }>
    >;
    selected: number;
    handleSelected: Dispatch<SetStateAction<number>>;
};

function Times(props: TimesProps) {
    return (
        <VStack>
            {props.times.map((entry, i) =>
                entry.time ? (
                    <Button
                        key={entry.time}
                        variant={entry.selected ? undefined : "outline"}
                        width="20"
                        height="10"
                        onClick={() => {
                            props.weekTimes[props.day][i].selected = !props.weekTimes[props.day][i]
                                .selected;
                            props.handleWeekTimes(props.weekTimes);
                            entry.selected
                                ? props.handleSelected(props.selected + 1)
                                : props.handleSelected(props.selected - 1);
                        }}>
                        {entry.time}
                    </Button>
                ) : (
                    <Text>No Times Available</Text>
                )
            )}
        </VStack>
    );
}

type WeekProps = {
    weekTimes: { [key: string]: [{ time: string; selected: boolean }] };
    handleWeekTimes: Dispatch<
        SetStateAction<{ [key: string]: [{ time: string; selected: boolean }] }>
    >;
    selected: number;
    handleSelected: Dispatch<SetStateAction<number>>;
};

function Week(props: WeekProps) {
    return (
        <Grid templateColumns="repeat(14, 1fr)" gap={8}>
            {Object.entries(props.weekTimes).map((wt, i) => (
                <>
                    <VStack>
                        <Text tw="mt-10" fontSize="large" fontWeight="bold">
                            {wt[0]}
                        </Text>
                        <Times
                            tw="mt-10"
                            times={wt[1]}
                            weekTimes={props.weekTimes}
                            day={wt[0]}
                            handleWeekTimes={props.handleWeekTimes}
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
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekAvailabilityClean: { [key: string]: [{ time: string; selected: boolean }] } = {};

const Availability = withLayout(UserPageLayout, function ({ username }: AvailabilityProps) {
    const [totalSelected, setTotalSelected] = useState(0);
    const [weekAvailabilityData, setWeekAvailabilityData] = useState({});

    // Get the weekAvailability data
    const { data } = useQuery(query, { variables: { username } });
    const user = data.users[0];
    const { weekAvailability } = user;

    useEffect(() => {
        // Arrange the weekAvailability data recieved from the query
        weekDays.map((wd) => (weekAvailabilityClean[wd] = [{ time: "", selected: false }]));

        weekAvailability.map((a: { dayName: string; availableAt: string }) => {
            if (weekAvailabilityClean[a.dayName][0].time === "") {
                weekAvailabilityClean[a.dayName] = [
                    { time: a.availableAt.slice(0, 5), selected: false },
                ];
            } else {
                weekAvailabilityClean[a.dayName].push({
                    time: a.availableAt.slice(0, 5),
                    selected: false,
                });
            }
        });

        setWeekAvailabilityData(weekAvailabilityClean);
    }, [weekAvailability]);

    return (
        <VStack>
            <TopBar selected={totalSelected} />
            <Week
                weekTimes={weekAvailabilityData}
                handleWeekTimes={setWeekAvailabilityData}
                selected={totalSelected}
                handleSelected={setTotalSelected}
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
