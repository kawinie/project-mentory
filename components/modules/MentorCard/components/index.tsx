import "twin.macro";
import Image from "next/image";
import { ReactComponentElement, ReactElement, useMemo, useCallback, useState } from "react";
import { Stack, StackDivider, Badge as ChakraBadge, AspectRatio } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Star, UserRectangle, ChatTeardropText, User } from "phosphor-react";

/* -------------------------------------------------------------------------- */
/*                                Profile Image                               */
/* -------------------------------------------------------------------------- */
/**
 * Conditionally render a placeholder profile image
 *
 */
export function ProfileImage({ url }: { url?: string }) {
    return (
        <AspectRatio w="100%" ratio={1} rounded="md" overflow="hidden">
            {url != undefined ? (
                <Image src={url} sizes="100%" layout="fill" objectFit="cover" />
            ) : (
                <UserRectangle />
            )}
        </AspectRatio>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Stat                                    */
/* -------------------------------------------------------------------------- */

export type StatProps = {
    title: string;
    value: number;
    icon: ReactElement;
};

export function Stat({ icon, value, title }: StatProps) {
    return (
        <div>
            <span tw="flex justify-center">
                {icon}
                <span tw="text-sm font-bold ml-1">{value}</span>
            </span>
            <div tw="text-sm text-secondary">{title}</div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                 Stat Group                                 */
/* -------------------------------------------------------------------------- */
/**
 * Render top-level presentation of mentor stats
 */

function makeStats(avgRating: number, noReviews: number, noEndorsements: number) {
    const $ = <T extends unknown>(t: string, v: number, i: T) => ({ title: t, value: v, icon: i });
    return [
        $("Avg. Rating", avgRating, Star),
        $("Reviews", noReviews, ChatTeardropText),
        $("Endorsements", noEndorsements, User),
    ] as const;
}

export type StatGroupProps = {
    direction: "column" | "row";
    avgRating: number;
    noReviews: number;
    noEndorsements: number;
};

export function StatGroup({ direction, ...rest }: StatGroupProps) {
    const stats = useMemo(() => makeStats(rest.avgRating, rest.noReviews, rest.noEndorsements), [
        rest,
    ]);

    return (
        <Stack
            direction={direction}
            border="1px"
            borderColor="coolGray.200"
            rounded="lg"
            spacing={4}
            alignItems="center"
            p={4}
            justify="space-between"
            divider={<StackDivider alignSelf="center" width="50%" />}>
            {stats.map(({ icon: Icon, ...stat }) => (
                <Stat key={stat.title} {...stat} icon={<Icon tw="inline" size={16} />} />
            ))}
        </Stack>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Badge                                   */
/* -------------------------------------------------------------------------- */

export function Badge({ text }: { text: string }) {
    return (
        <ChakraBadge
            bg="amber.400"
            textTransform="capitalize"
            size="sm"
            py={0.5}
            px={1}
            rounded="4px"
            fontWeight="normal"
            fontFamily="menlo">
            {text}
        </ChakraBadge>
    );
}

export function ScrollableText({ text }: { text?: string }) {
    const [scrollingEnabled, setEnableScrolling] = useState(false);
    const detectShouldAutoScrollRef = useCallback((node) => {
        if (node !== null) setEnableScrolling(node.scrollWidth > node.clientWidth);
    }, []);
    return (
        <motion.p
            ref={detectShouldAutoScrollRef}
            animate={scrollingEnabled && { x: "-50%" }}
            transition={{
                repeat: Infinity,
                duration: Math.max(1, (text ?? "").length / 10),
                repeatType: "reverse",
                repeatDelay: 2,
            }}>
            {text}
        </motion.p>
    );
}
