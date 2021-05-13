import "twin.macro";
import { ReactElement, useMemo } from "react";
import { Stack, StackDivider } from "@chakra-ui/react";
import { Star, ChatTeardropText, User } from "phosphor-react";

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
            <span tw="flex justify-center items-center">
                {icon}
                <span tw="text-sm font-bold ml-1">{value}</span>
            </span>
            <div tw="text-sm text-secondary whitespace-nowrap">{title}</div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                 Stat Group                                 */
/* -------------------------------------------------------------------------- */
/**
 * Render top-level presentation of mentor stats
 */

// export function makeStats(avgRating: number, noReviews: number, noEndorsements: number) {
export function makeStats(avgRating: number) {
    const $ = <T extends unknown>(t: string, v: number, i: T) => ({ title: t, value: v, icon: i });
    return [
        $("Avg. Rating", avgRating, Star),
        // $("Reviews", noReviews, ChatTeardropText),
        // $("Endorsements", noEndorsements, User),
    ] as const;
}

export type StatGroupProps = {
    direction: "column" | "row";
    avgReviewScore: number;
    // noReviews: number;
    // noEndorsements: number;
    className?: string;
};

export function StatGroup({ direction, className, ...rest }: StatGroupProps) {
    const stats = useMemo(
        // () => makeStats(rest.avgReviewScore, rest.noReviews, rest.noEndorsements),
        () => makeStats(rest.avgReviewScore),
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
            divider={<StackDivider alignSelf="center" width="50%" />}
            className={className}>
            {stats.map(({ icon: Icon, ...stat }) => (
                <Stat key={stat.title} {...stat} icon={<Icon tw="inline" size={16} />} />
            ))}
        </Stack>
    );
}
