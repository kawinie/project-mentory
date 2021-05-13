import NextImage from "next/image";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useCallback, useEffect, useState, memo } from "react";
import {
    Box,
    HStack,
    VStack,
    AspectRatio,
    Heading,
    Grid,
    Spinner,
    Button,
    Textarea,
    chakra,
    Checkbox,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Pencil } from "phosphor-react";
import { floor, padStart, range } from "lodash";
import { useForm } from "react-hook-form";

import { NavBar } from "components/modules/NavBar";
import { strapiImgLoader } from "utils/strapi";

import query from "./gql/edit.gql";
import aboutMutation from "./gql/aboutMutation.gql";

type ActiveTabProps = {
    href: string;
    label: string;
    className?: string;
    children?: ReactNode;
};

const ActiveTab = ({ href, label }: ActiveTabProps) => {
    const router = useRouter();
    const isActive = window.location.hash == `#${href}`;
    return (
        <Button
            variant="ghost"
            _hover={{ borderColor: "primary", color: "text-primary-darker" }}
            borderRight="2px"
            borderColor={isActive ? "text-primary-darker" : "fade"}
            color={isActive ? "primary" : "darkgray"}
            textTransform="capitalize"
            borderRadius="0"
            onClick={() => router.replace(`#${href}`)}
            pr={8}>
            {label}
        </Button>
    );
};

function Header() {
    const username = useSelector((state) => state.currentUsername);
    return (
        <Box>
            <NavBar username={username ?? ""} />
            <Box mx="auto" alignItems="start" maxW="container.lg" spacing={8} mt={8}></Box>
        </Box>
    );
}

function AboutTab() {
    const username = useSelector((state) => state.currentUsername);
    const { data } = useQuery(query, { variables: { username } });
    const {
        id,
        firstname,
        lastname,
        brief,
        about,
        city,
        status,
        profession,
        state,
    } = data.users[0];

    const [updateUserInfo] = useMutation(aboutMutation);

    const { handleSubmit, register } = useForm({
        defaultValues: {
            firstname,
            lastname,
            brief,
            about,
            city,
            status,
            profession,
            state,
        },
    });

    const submitHandler = handleSubmit((values) => {
        console.log(values);
        updateUserInfo({ variables: { id, data: values } });
    });

    const sections = ([
        { brief },
        { about },
        { city },
        { status },
        { profession },
        { state },
    ] as const).map((e) => ({
        name: Object.keys(e)[0],
        data: Object.values(e)[0] as string,
    }));

    return (
        <Fragment>
            <Box
                gridColumn="1/-1"
                textAlign="right"
                fontSize="md"
                textTransform="uppercase"
                w="full"
                fontWeight="semibold">
                About
            </Box>
            <Grid as="form" w="full" columnGap={16} rowGap={8} templateColumns="150px 1fr">
                <Box textAlign="center" fontWeight="bold">
                    Name
                </Box>
                <Box>{`${firstname} ${lastname}`}</Box>

                {sections.map((section) => (
                    <Fragment key={section.name}>
                        <Box textAlign="center" fontWeight="bold" textTransform="capitalize">
                            {section.name}
                        </Box>
                        <Textarea name={section.name} ref={register} />
                    </Fragment>
                ))}
            </Grid>

            <Box alignSelf="flex-end" pb={8}>
                <Button type="submit" onClick={submitHandler}>
                    Save
                </Button>
            </Box>
        </Fragment>
    );
}

const times = range(0, 24, 0.5).map((n) =>
    n % 1 === 0 ? `${n}:00` : `${padStart(String(floor(n)), 2, "0")}:30`
);

type TimeCheckboxProps = {
    isCheck: boolean;
    day: string;
    time: string;
    handleToggle(day: string, time: string, isChecked: boolean): void;
};

const TimeCheckbox = memo(({ day, time, isCheck, handleToggle }: TimeCheckboxProps) => {
    return (
        <Checkbox isChecked={isCheck} onChange={() => handleToggle(day, time, !isCheck)}>
            {time}
        </Checkbox>
    );
});

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const dateKey = (day: string, time: string) => `${day}-${time}`;
function AvailabilityTab() {
    const username = useSelector((state) => state.currentUsername);
    const { data } = useQuery(query, { variables: { username } });
    const [schedule, setSchedule] = useState<Record<string, boolean>>({});

    const handleToggle = useCallback((day: string, time: string, isChecked: boolean) => {
        setSchedule((prev) => ({ ...prev, [dateKey(day, time)]: isChecked }));
    }, []);

    useEffect(() => {
        console.log(schedule);
    }, [schedule]);

    return (
        <Fragment>
            <Box
                gridColumn="1/-1"
                textAlign="right"
                fontSize="md"
                textTransform="uppercase"
                w="full"
                fontWeight="semibold">
                Availability
            </Box>
            <chakra.form w="full" display="grid" gridRowGap={4}>
                <Accordion defaultIndex={0} allowMultiple>
                    {days.map((day) => (
                        <AccordionItem key={day}>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" textTransform="capitalize">
                                    {day}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <Grid templateColumns="repeat( auto-fit, minmax(100px, 1fr) )">
                                    {times.map((time) => (
                                        <TimeCheckbox
                                            key={dateKey(day, time)}
                                            day={day}
                                            time={time}
                                            isCheck={schedule[dateKey(day, time)] ?? false}
                                            handleToggle={handleToggle}
                                        />
                                    ))}
                                </Grid>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>

                <Box alignSelf="flex-end">
                    <Button
                        type="submit"
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log(e);
                        }}>
                        Save
                    </Button>
                </Box>
            </chakra.form>
        </Fragment>
    );
}

function Tabs() {
    switch (window.location.hash) {
        case "#about":
            return <AboutTab />;
        case "#availability":
            return <AvailabilityTab />;
        default:
            return null;
    }
}

function UserForm() {
    const username = useSelector((state) => state.currentUsername);
    const router = useRouter();

    useEffect(() => {
        if (!window.location.hash) {
            router.replace("#about");
        }
    }, [router]);

    const { data, loading } = useQuery(query, { variables: { username } });

    if (loading) {
        return null;
    }

    const { profileImg } = data.users[0];

    return (
        <Box>
            <Header />
            <HStack mx="auto" alignItems="start" maxW="container.lg" spacing={8} mt={8}>
                <VStack spacing={4}>
                    <Box w="150px" flexShrink={0}>
                        <AspectRatio w="full" ratio={1} rounded="md" overflow="hidden">
                            <NextImage
                                loader={strapiImgLoader}
                                src={profileImg.url}
                                sizes="100%"
                                layout="fill"
                                objectFit="cover"
                            />
                        </AspectRatio>
                    </Box>
                    <Button variant="outline" w="full" rightIcon={<Pencil size={16} />}>
                        Edit
                    </Button>
                    <VStack alignItems="flex-end" spacing="0" pt={8}>
                        {[
                            { href: "about", label: "about" },
                            { href: "availability", label: "availability" },
                            { href: "achievements", label: "achievements" },
                            { href: "reviews", label: "reviews" },
                            { href: "tags", label: "tags" },
                        ].map((btn) => (
                            <ActiveTab key={btn.label} href={btn.href} label={btn.label} />
                        ))}
                    </VStack>
                </VStack>

                <VStack w="full" spacing={4}>
                    <Heading alignSelf="start">My Profile</Heading>
                    <Tabs />
                </VStack>
            </HStack>
        </Box>
    );
}

function Edit() {
    const auth = useSelector((state) => state.authStatus);
    const router = useRouter();

    switch (auth) {
        case "ready":
        case "autheticating":
            return (
                <Box display="grid" placeItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            );
        case "authenticated":
            return <UserForm />;
        case "unauthenticated":
            router.push("/login?referal=/users/me/edit");
            return <Box>Please login</Box>;
    }
}

export default Edit;
