import "twin.macro";
import Image from "next/image";
import { ReactElement } from "react";
import { Stack, StackDivider, Badge as ChakraBadge, AspectRatio } from "@chakra-ui/react";
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

export type StatProps = {
    icon: ReactElement;
    value: string;
    title: string;
};

export function Stat({ icon, value, title }: StatProps) {
    return (
        <div>
            <span tw="flex justify-center">
                {icon}
                <span tw="text-sm font-medium ml-1">{value}</span>
            </span>
            <div tw="text-sm text-secondary">{title}</div>
        </div>
    );
}

export function StatView({ direction }: { direction: "column" | "row" }) {
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
            <Stat title="Avg. Rating" value="4.3" icon={<Star tw="inline" size={16} />} />
            <Stat title="Reviews" value="127" icon={<ChatTeardropText tw="inline" size={16} />} />
            <Stat title="Endorsement" value="80" icon={<User tw="inline" size={16} />} />
        </Stack>
    );
}

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
