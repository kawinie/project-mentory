import { css } from "twin.macro";
import { keyframes } from "@emotion/react";
import { useState, ReactElement, ReactNode, useCallback } from "react";
import {
    Box,
    Grid,
    GridProps,
    Flex,
    VStack,
    HStack,
    Heading,
    Tag,
    TagLeftIcon,
    TagLabel,
    Button,
    Checkbox,
    Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Heart, MapPin, Circle, Rss } from "phosphor-react";
import Link from "next/link";

import { ProfileImage, StatView, Badge } from "./bits";

export type MentorCardProps = {
    fullname: string;
    badge: string;

    location: string;
    expInYears: number;
    stories?: string;

    tags: string[];
    avgRating: number;
    numberOfReviews: number;
    numberOfEndorsements: number;

    profileImg?: string;
    profileUrl?: string;

    short: string;

    variant: "mobile" | "desktop";
};

function Mobile({ profileImg }: MentorCardProps) {
    return <div></div>;
}

function Desktop({
    fullname,
    location,
    profileImg,
    badge,
    tags,
    expInYears,
    stories,
    short,
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

    const [scrollingEnabled, setEnableScrolling] = useState(false);
    const detectShouldAutoScrollRef = useCallback((node) => {
        if (node !== null) setEnableScrolling(node.scrollWidth > node.clientWidth);
    }, []);

    return (
        <Grid {...grid_layout} {...grid_styles} width={800}>
            {/* Profile Image */}
            <VStack gridArea="profile">
                <ProfileImage url={profileImg} />
                <Button w="full" size="sm" fontWeight="medium" leftIcon={<Heart size={16} />}>
                    Like
                </Button>

                {/* alignContent only works with flexWap = "wrap" | "wrap-reverse" */}
                <Checkbox w="full" alignContent="end" flexGrow={1} flexWrap="wrap">
                    <span tw="text-sm text-secondary">Compare</span>
                </Checkbox>
            </VStack>

            {/* Tags */}
            <HStack gridArea="tags" justify="start" spacing={4}>
                {tags.map((t) => (
                    <Tag key={t} textTransform="capitalize">
                        {t}
                    </Tag>
                ))}
            </HStack>

            {/* Main */}
            <VStack gridArea="main" alignItems="start">
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
                        <Rss tw="mr-1 animate-pulse flex-shrink-0" size={20} />
                        <TagLabel>
                            <motion.p
                                animate={scrollingEnabled && { x: "-50%" }}
                                transition={{
                                    repeat: Infinity,
                                    duration: Math.max(1, (stories ?? "").length / 10),
                                    repeatType: "reverse",
                                    repeatDelay: 2,
                                }}
                                ref={detectShouldAutoScrollRef}>
                                {stories}
                            </motion.p>
                        </TagLabel>
                    </Tag>
                </HStack>

                {/* Content */}
                <Text fontSize="sm" color="secondary" flexGrow={1}>
                    {short}
                </Text>

                {/* Actions */}
                <HStack w="full" justifyContent="end">
                    <Button fontWeight="medium">Make Appointment</Button>
                    <Button fontWeight="medium">View</Button>
                </HStack>
            </VStack>

            <Flex gridArea="view">
                <StatView direction="column" />
            </Flex>
        </Grid>
    );
}

export function MentorCard(props: MentorCardProps) {
    return props.variant === "desktop" ? <Desktop {...props} /> : <Mobile {...props} />;
}
