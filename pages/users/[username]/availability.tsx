import "twin.macro";
import { GetServerSideProps } from "next";
import { Divider, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { DotsThree } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { withLayout } from "utils/layout";
import { initializeApollo } from "utils/apollo";
import { setTransctionDetails } from "redux/actions";

import query from "./gql/availability.gql";

import { UserPageLayout } from ".";

/* -------------------------------------------------------------------------- */
/*                             Times Component                                */
/* -------------------------------------------------------------------------- */
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
                        width="100px"
                        height="44px"
                        onClick={() => {
                            // Toggles "selected" field within week availability object
                            props.weekTimes[props.day][i].selected = !props.weekTimes[props.day][i]
                                .selected;
                            props.handleWeekTimes(props.weekTimes);
                            // Increments or decrements total times selected accordingly
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

/* -------------------------------------------------------------------------- */
/*                              Week Component                                */
/* -------------------------------------------------------------------------- */
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
                <Fragment key={i}>
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
                </Fragment>
            ))}
        </Grid>
    );
}

/* -------------------------------------------------------------------------- */
/*                       Format DateTimes Helper Function                     */
/* -------------------------------------------------------------------------- */
function formatDateTimes(weekTimes: { [key: string]: [{ time: string; selected: boolean }] }) {
    const dateTimes: { [key: string]: string }[] = [];

    for (const key in weekTimes) {
        weekTimes[key].map((time) => {
            if (time.selected) {
                dateTimes.push({
                    transactionDateTime: new Date(
                        `${key.slice(4, 8)}/2021 ${time.time}`
                    ).toISOString(),
                });
            }
        });
    }

    return dateTimes;
}

/* -------------------------------------------------------------------------- */
/*                             Top Bar Component                              */
/* -------------------------------------------------------------------------- */
type TopBarProps = {
    selected: number;
    weekTimes: { [key: string]: [{ time: string; selected: boolean }] };
    mentorName: string;
};

function TopBar(props: TopBarProps) {
    const loggedInUserId = useSelector((state) => state.currentUserId);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

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
                <Button
                    onClick={() => {
                        if (!formatDateTimes(props.weekTimes).length) {
                            alert("Please select at least one meeting time");
                        } else if (!loggedInUserId) {
                            alert("You must be signed in to book a meeting.");
                        } else {
                            dispatch(
                                setTransctionDetails(
                                    props.mentorName,
                                    loggedInUserId,
                                    formatDateTimes(props.weekTimes)
                                )
                            );
                            onOpen();
                        }
                    }}
                    width="40">
                    Book Now
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Are you sure you want to continue?</ModalHeader>
                        <ModalFooter>
                            <Button size="sm" variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Link
                                href={{
                                    pathname: "/checkout",
                                }}>
                                <Button size="sm" variant="ghost">
                                    Continue
                                </Button>
                            </Link>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </HStack>
        </HStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                  Configure/Arrange Dates Helper Function                   */
/* -------------------------------------------------------------------------- */
function configDates() {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const weekDates = [];

    // Format today's date
    const mmdd = `${weekDays[today.getDay()]} ${String(today.getMonth() + 1)}/${String(
        today.getDate()
    )}`;
    weekDates.push(mmdd);

    // Use today's date to get & format the next 6 days of the week
    for (let i = 1; i < 7; i++) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + i);
        const mmdd = `${weekDays[tomorrow.getDay()]} ${String(tomorrow.getMonth() + 1)}/${String(
            tomorrow.getDate()
        )}`;
        weekDates.push(mmdd);
    }

    return weekDates;
}

/* -------------------------------------------------------------------------- */
/*                         Full Availability Component                        */
/* -------------------------------------------------------------------------- */
const weekAvailabilityClean: { [key: string]: [{ time: string; selected: boolean }] } = {};
const weekDates = configDates();

type AvailabilityProps = {
    username: string;
    weekAvailability: {
        dayName: string;
        availableAt: string;
    }[];
};

const Availability = withLayout(
    UserPageLayout,
    function ({ username, weekAvailability }: AvailabilityProps) {
        const [totalSelected, setTotalSelected] = useState(0);
        const [weekAvailabilityData, setWeekAvailabilityData] = useState({});

        useEffect(() => {
            // Initialize the cleaned week availability data
            weekDates.forEach(
                (wd) => (weekAvailabilityClean[wd.slice(0, 3)] = [{ time: "", selected: false }])
            );

            // Arrange the week availability data recieved from the query
            weekAvailability.forEach((a: { dayName: string; availableAt: string }) => {
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

            // Add the dates to the days of the week
            weekDates.forEach((wd) => {
                delete Object.assign(weekAvailabilityClean, {
                    [wd]: weekAvailabilityClean[wd.slice(0, 3)],
                })[wd.slice(0, 3)];
            });

            setWeekAvailabilityData(weekAvailabilityClean);
        }, [weekAvailability]);

        return (
            <VStack>
                <TopBar
                    selected={totalSelected}
                    weekTimes={weekAvailabilityData}
                    mentorName={username}
                />
                <Week
                    weekTimes={weekAvailabilityData}
                    handleWeekTimes={setWeekAvailabilityData}
                    selected={totalSelected}
                    handleSelected={setTotalSelected}
                />
            </VStack>
        );
    }
);

export default Availability;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */
type Params = { username: string };

export const getServerSideProps: GetServerSideProps<AvailabilityProps, Params> = async (
    context
) => {
    if (context.params == undefined) {
        return { notFound: true };
    }

    const client = initializeApollo();
    const variables = { username: context.params.username };
    const { data, error } = await client.query({ query, variables });

    if (error || data.users == null || data.users.length == 0) {
        return { notFound: true };
    }

    const layoutProps = await Availability.retrievePropsFromLayoutDataRequirement(context);
    return {
        props: {
            username: context.params.username,
            ...data.users[0],
            layoutProps,
        },
    };
};

// Use the same static paths as main layout
// export { getStaticPaths } from "./index";
