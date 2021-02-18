import "twin.macro";
import Image from "next/image";
import { ReactElement, useMemo, useCallback, useState } from "react";
import {
    Stack,
    StackDivider,
    Badge as ChakraBadge,
    AspectRatio,
    IconButton,
    IconButtonProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Star, UserRectangle, ChatTeardropText, User, Heart } from "phosphor-react";
import ColorThief from "color-thief";
import { css } from "@emotion/css";

/* -------------------------------------------------------------------------- */
/*                                Profile Image                               */
/* -------------------------------------------------------------------------- */

// const rgbToHex = (r: number, g: number, b: number) =>
//     `#${[r, g, b]
//         .map((x) => {
//             const hex = x.toString(16);
//             return hex.length === 1 ? "0" + hex : hex;
//         })
//         .join("")}`;

function rgbToHsl(r: number, g: number, b: number) {
    (r /= 255), (g /= 255), (b /= 255);

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}

/**
 * Conditionally render a placeholder profile image
 *
 */
export function ProfileImage({ url }: { url?: string }) {
    const [hsl, setHsl] = useState([0, 0, 0]);
    return (
        <AspectRatio
            w="100%"
            ratio={1}
            rounded="md"
            overflow="hidden"
            className={css`
                box-shadow: 0 12px 24px -5px hsla(${hsl[0]}, ${Math.min(hsl[1] + 50, 100)}%, ${hsl[2]}%, 0.25);
            `}>
            {url != undefined ? (
                <Image
                    src={url}
                    sizes="100%"
                    layout="fill"
                    objectFit="cover"
                    onLoad={(e) => {
                        const colorThief = new ColorThief();
                        const rgb = colorThief.getColor(e.target);
                        setHsl(rgbToHsl(rgb[0], rgb[1], rgb[2]));
                    }}
                />
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
            <div tw="w-full h-full absolute top-0 z-10 bg-gradient-to-r from-transparent via-transparent to-white" />
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
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                 Like Button                                */
/* -------------------------------------------------------------------------- */

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
            icon={liked ? <Heart color={"#F43F5E"} weight="fill" /> : <Heart />}
            onClick={() => setLiked((like) => !like)}
        />
    );
}
