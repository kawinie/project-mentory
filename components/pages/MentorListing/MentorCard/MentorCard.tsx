import "twin.macro";
import { Box, VStack, HStack, Text, Badge } from "@chakra-ui/react";
import { memo } from "react";

import { ImageDisplay } from "../ImageDisplay";

type AttributesProps = {
    title: string;
    badges: string[];
};

function Attributes({ title, badges }: AttributesProps) {
    return (
        <VStack align="start">
            <Text tw="uppercase text-xs font-bold">{title}</Text>
            <HStack>
                {badges.map((text) => (
                    <Badge key={text} tw="px-2 py-1 bg-blueGray-200 text-gray-500 rounded-full">
                        {text}
                    </Badge>
                ))}
            </HStack>
        </VStack>
    );
}

export function MentorCard({ image }: { image: string }) {
    return (
        <Box
            tw="rounded-lg overflow-hidden z-10"
            maxW="370px"
            boxShadow="1px 4px 16px 0 rgba(0,0,0,0.1)">
            <ImageDisplay image={image} />

            <VStack tw="border border-t-0" px={4} py={6} align="start" spacing={4}>
                <Text tw="w-full text-xs" color="gray.500" mb={-2}>
                    <span tw="text-teal-500">SOFTWARE ENGINEER</span> (OR, USA)
                </Text>
                <Text tw="leading-none" fontSize="2xl" fontFamily="Raleway" fontWeight="bold">
                    Norman Gordon
                </Text>
                <Text noOfLines={5} fontSize="sm" color="gray.500" mb={4} isTruncated>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in
                    arcu. At volutpat diam ut venenatis tellus in metus vulputate eu. Feugiat
                    pretium nibh ipsum consequat.
                </Text>

                <Attributes title="Availability" badges={["40 hours"]} />
                <Attributes title="Focus/skills" badges={["frontend", "ui/ux", "aws", "react"]} />
            </VStack>
        </Box>
    );
}

export const MemoizedMentorCard = memo(MentorCard);
