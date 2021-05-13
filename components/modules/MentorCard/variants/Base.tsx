import "twin.macro";
import {
    Flex,
    VStack,
    HStack,
    Heading,
    Tag,
    TagLabel,
    Button,
    Checkbox,
    Text,
} from "@chakra-ui/react";
import { MapPin, Circle, Rss } from "phosphor-react";
import Link from "next/link";

import { ProfileImage, StatGroup, Badge, AutoScrollText } from "../components";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

export type MentorCardProps = {
    fullname: string;
    badge: string;

    location: string;
    expInYears: number;
    status?: string;

    tags: JSON;
    avgReviewScore: number;
    noReviews: number;
    noEndorsements: number;

    profileImg?: JSON;
    profileUrl?: string;

    brief: string;

    variant: "mobile" | "desktop";
};

/* -------------------------------------------------------------------------- */
/*                                Helper Types                                */
/* -------------------------------------------------------------------------- */

interface TopLevelGridArea {
    gridArea: "profile" | "tags" | "main" | "view";
}

type TopLevelGridItem<T> = T & TopLevelGridArea;

/* -------------------------------------------------------------------------- */
/*                               Profile Section                              */
/* -------------------------------------------------------------------------- */

export function ProfileSection({
    img,
    gridArea,
}: TopLevelGridItem<{ img: MentorCardProps["profileImg"] }>) {
    return (
        <VStack gridArea={gridArea} position="relative">
            {img && <ProfileImage url={REACT_APP_BACKEND_URL + img.url} />}
            {/* alignContent only works with flexWap = "wrap" | "wrap-reverse" */}
            <Checkbox w="full" alignContent="start" justifyContent="center" flexWrap="wrap">
                <span tw="text-sm text-secondary z-10">Compare</span>
            </Checkbox>
        </VStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                                Tags Section                                */
/* -------------------------------------------------------------------------- */

export function TagSection({
    tags,
    gridArea,
}: TopLevelGridItem<{ tags: MentorCardProps["tags"] }>) {
    return (
        <HStack gridArea={gridArea} justify="start" spacing={2} overflow="hidden">
            {tags.map((t) => (
                <Tag key={t.label} variant="primary">
                    {t.label}
                </Tag>
            ))}
        </HStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                                Main Section                                */
/* -------------------------------------------------------------------------- */

export function MainSection({
    fullname,
    badge,
    expInYears,
    status,
    brief,
    location,
}: TopLevelGridItem<
    Pick<MentorCardProps, "fullname" | "location" | "expInYears" | "status" | "brief" | "badge">
>) {
    return (
        <VStack gridArea="main" alignItems="start" spacing={4}>
            {/* Name */}
            <HStack alignItems="center">
                <Heading as="h2" fontSize="2xl">
                    {fullname}
                </Heading>
                {/* <Badge text={badge} /> */}
            </HStack>

            {/* Secondary Info */}
            <HStack
                divider={<Circle tw="text-secondary mx-2" weight="fill" size={4} />}
                overflow="hidden">
                <Tag bg="transparent" fontWeight="normal" p={0} flexShrink={0}>
                    <MapPin tw="mr-1" size={20} />
                    <Link href="/" passHref>
                        <a>{location}</a>
                    </Link>
                </Tag>
                {/* <Tag bg="transparent" fontWeight="normal" p={0} flexShrink={0}>
                    {`${expInYears < 1 ? "<" : ""} ${expInYears}${expInYears > 1 ? "+" : ""} years`}
                </Tag> */}
            </HStack>

            <Tag bg="transparent" fontWeight="normal" p={0} textOverflow="ellipsis">
                <Rss tw="animate-pulse flex-shrink-0 mr-1" size={20} mirrored={true} />
                <TagLabel>
                    <AutoScrollText text={status} />
                </TagLabel>
            </Tag>

            {/* Short summary or content */}
            <Text fontSize="sm" color="secondary" isTruncated noOfLines={3}>
                {brief}
            </Text>

            {/* Action Buttons */}
            <HStack w="full" justifyContent="end" flexGrow={1} alignContent="end" wrap="wrap">
                <span tw="text-xs text-secondary underline">Available to meet now</span>
                <Button minW="100px" variant="outline">
                    Make Appointment
                </Button>
                <Button minW="100px" colorScheme="blueGray">
                    View
                </Button>
            </HStack>
        </VStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                                Stat Section                                */
/* -------------------------------------------------------------------------- */

export function StatSection({
    gridArea,
    direction,
    avgReviewScore,
    noReviews,
    noEndorsements,
}: TopLevelGridItem<
    Pick<MentorCardProps, "avgReviewScore" | "noReviews" | "noEndorsements"> & {
        direction: "column" | "row";
    }
>) {
    return (
        <Flex gridArea={gridArea}>
            <StatGroup {...{ direction, avgReviewScore, noReviews, noEndorsements }} />
        </Flex>
    );
}
