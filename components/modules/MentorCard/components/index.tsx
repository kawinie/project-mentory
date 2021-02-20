import "twin.macro";
import Image from "next/image";
import { ReactElement, useMemo, useCallback, useState, SyntheticEvent } from "react";
import {
    Stack,
    StackDivider,
    Badge as ChakraBadge,
    AspectRatio,
    IconButton,
    IconButtonProps,
} from "@chakra-ui/react";
import { motion, Variant } from "framer-motion";
import { Star, UserRectangle, ChatTeardropText, User, Heart } from "phosphor-react";
import { css } from "@emotion/css";
import ColorThief from "color-thief";

import { rgbToHsl } from "utils";

/* -------------------------------------------------------------------------- */
/*                                Profile Image                               */
/* -------------------------------------------------------------------------- */

/**
 * Conditionally render a placeholder profile image
 *
 */
export function ProfileImage({ url }: { url?: string }) {
    const [hsl, setHsl] = useState([0, 0, 0]);
    if (url == undefined) return <UserRectangle />;

    const [hue, sat, light] = hsl;
    const onload = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const colorThief = new ColorThief();
        const rgb = colorThief.getColor(e.currentTarget);
        if (rgb) {
            const [r, g, b] = rgb;
            setHsl(rgbToHsl(r, g, b));
        }
    };

    return (
        <AspectRatio
            w="100%"
            ratio={1}
            rounded="md"
            overflow="hidden"
            className={css`
                box-shadow: 0 12px 24px -5px hsla(${hue}, ${Math.min(sat + 50, 100)}%, ${light}%, 0.25);
            `}>
            <Image src={url} sizes="100%" layout="fill" objectFit="cover" onLoad={onload} />
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
    avgReviewScore: number;
    noReviews: number;
    noEndorsements: number;
};

export function StatGroup({ direction, ...rest }: StatGroupProps) {
    const stats = useMemo(
        () => makeStats(rest.avgReviewScore, rest.noReviews, rest.noEndorsements),
        [rest]
    );

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

/* -------------------------------------------------------------------------- */
/*                               AutoScroll Text                              */
/* -------------------------------------------------------------------------- */

export function AutoScrollText({ text }: { text?: string }) {
    const [scrollingEnabled, setEnableScrolling] = useState(false);
    const detectShouldAutoScrollRef = useCallback((node) => {
        if (node !== null) setEnableScrolling(node.scrollWidth > node.clientWidth);
    }, []);
    return (
        <div tw="relative">
            {/* Gradient Overlay for fading to right (transparent to white)*/}
            <div tw="w-full h-full absolute top-0 z-10 background[linear-gradient(90deg, rgba(255,255,255,0) 75%, white 100%)]" />
            <motion.p
                ref={detectShouldAutoScrollRef}
                animate={scrollingEnabled && { x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    duration: Math.max(1, (text ?? "").length / 10),
                    repeatType: "reverse",
                    repeatDelay: 3,
                }}>
                {text}
            </motion.p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                 Like Button                                */
/* -------------------------------------------------------------------------- */

const HeartIcon = ({ isLiked }: { isLiked: boolean }) => {
    type State = "liked" | "notLiked";
    const states: Record<State, Variant> = {
        liked: {
            scale: 1.2,
            rotateY: 180,
        },
        notLiked: {
            scale: 0.9,
            rotateY: 0,
        },
    };

    const likedState: State = isLiked ? "liked" : "notLiked";

    return (
        <motion.div animate={likedState} variants={states} transition={{ type: "spring" }}>
            <Heart color={isLiked ? "#F43F5E" : "black"} weight={isLiked ? "fill" : "regular"} />
        </motion.div>
    );
};

export function LikeButton({
    isLiked,
    ...props
}: Omit<IconButtonProps, "aria-label"> & { isLiked: boolean }) {
    const [liked, setLiked] = useState(isLiked);

    return (
        <IconButton
            {...props}
            position="absolute"
            size="md"
            rounded={0}
            borderBottomLeftRadius={4}
            aria-label="Like"
            fontSize={24}
            icon={<HeartIcon isLiked={liked} />}
            onClick={() => setLiked((like) => !like)}
            bg="transparent"
        />
    );
}
