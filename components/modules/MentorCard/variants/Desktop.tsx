import {} from "twin.macro";
import { useState, useCallback } from "react";
import {
    Grid,
    GridProps,
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
import { Heart, MapPin, Circle, Rss } from "phosphor-react";
import Link from "next/link";

import { ProfileImage, StatGroup, Badge, ScrollableText } from "../components";

import { MentorCardProps } from "./Base";

export function Desktop({
    fullname,
    location,
    profileImg,
    badge,
    tags,
    expInYears,
    stories,
    short,
    avgRating,
    noReviews,
    noEndorsements,
}: MentorCardProps) {
    const grid_layout: GridProps = {
        templateAreas: `
            "profile tags tags"
            "profile main view"
        `,
        templateColumns: "120px 1fr max-content",
        templateRows: "max-content 1fr",
        gap: 4,
    };

    const grid_styles: GridProps = {
        p: 8,
        border: "1px",
        borderColor: "coolGray.200",
        bg: "white",
        rounded: "md",
    };

    return (
        <Grid {...grid_layout} {...grid_styles} width={800}>
            {/* Profile Image */}
            <VStack gridArea="profile">
                <ProfileImage url={profileImg} />

                {/* alignContent only works with flexWap = "wrap" | "wrap-reverse" */}
                <Checkbox
                    w="full"
                    alignContent="start"
                    justifyContent="center"
                    flexGrow={1}
                    flexWrap="wrap">
                    <span tw="text-sm text-secondary">Compare</span>
                </Checkbox>

                <Button w="full" size="md" fontWeight="medium" leftIcon={<Heart size={20} />}>
                    Like
                </Button>
            </VStack>

            {/* Tags */}
            <HStack gridArea="tags" justify="start" spacing={2} overflow="hidden">
                {tags.map((t) => (
                    <Tag
                        key={t}
                        textTransform="capitalize"
                        bg="transparent"
                        border="1px"
                        borderColor="fade"
                        fontWeight="normal"
                        color="secondary"
                        rounded="full"
                        fontSize="xs"
                        flexShrink={0}>
                        {t}
                    </Tag>
                ))}
            </HStack>

            {/* Main */}
            <VStack gridArea="main" alignItems="start" spacing={4}>
                <HStack alignItems="center">
                    <Heading as="h2" fontSize="2xl">
                        {fullname}
                    </Heading>
                    <Badge text={badge} />
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
                    <Tag bg="transparent" fontWeight="normal" p={0} flexShrink={0}>
                        {`${expInYears} years`}
                    </Tag>
                    <Tag bg="transparent" fontWeight="normal" p={0} textOverflow="ellipsis">
                        <Rss tw="animate-pulse flex-shrink-0 mr-1" size={20} />
                        <TagLabel>
                            <ScrollableText text={stories} />
                        </TagLabel>
                    </Tag>
                </HStack>

                {/* Content */}
                <Text fontSize="sm" color="secondary" flexGrow={1} isTruncated noOfLines={3}>
                    {short}
                </Text>

                {/* Action Buttons */}
                <HStack w="full" justifyContent="end">
                    <span tw="text-xs text-secondary underline">Available to meet now</span>
                    <Button fontWeight="medium" minW="100px">
                        Make Appointment
                    </Button>
                    <Button fontWeight="medium" minW="100px">
                        View
                    </Button>
                </HStack>
            </VStack>

            <Flex gridArea="view">
                <StatGroup
                    direction="column"
                    {...{
                        avgRating,
                        noReviews,
                        noEndorsements,
                    }}
                />
            </Flex>
        </Grid>
    );
}
