import "twin.macro";
import Image from "next/image";
import { Box, Flex, VStack, HStack, Grid, Text, Badge, AspectRatio } from "@chakra-ui/react";
import { times } from "lodash";

type TabButtonProps = {
    isActive?: boolean;
};

function TabButton({ isActive }: TabButtonProps) {
    return (
        <Flex
            tw="border rounded-full w-3 h-3 items-center justify-center"
            borderColor={isActive ? "#DC6450" : "gray.400"}
            color={isActive ? "#DC6450" : "gray.400"}>
            <Box bgColor="currentcolor" rounded="full" w={2} h={2}></Box>
        </Flex>
    );
}

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
                    <Badge key={text} tw="rounded-md px-2 py-1 font-medium" color="gray.500">
                        {text}
                    </Badge>
                ))}
            </HStack>
        </VStack>
    );
}

function ImageDisplay() {
    return (
        <VStack w="full" align="start" spacing={4}>
            <AspectRatio tw="relative w-full" ratio={1} bgColor="gray.100">
                {/* sizes=100% is needed here to make next/image work properly */}
                <Image src="/svg/avatar.svg" sizes="100%" layout="fill" objectFit="contain" />
            </AspectRatio>
            <HStack px={4} spacing={2}>
                <TabButton isActive />
                <TabButton />
                <TabButton />
                <TabButton />
                <TabButton />
            </HStack>
        </VStack>
    );
}

function Card() {
    return (
        <Box tw="border rounded-xl overflow-hidden" maxW="500px">
            <VStack align="start">
                <ImageDisplay />

                <VStack p={4} align="start" spacing={4}>
                    <Text fontSize="xs" color="gray.500" mb={-2}>
                        <span tw="text-teal-500">SOFTWARE ENGINEER</span> (OR, USA)
                    </Text>
                    <Text tw="leading-none" fontSize="3xl" fontFamily="Raleway" fontWeight="bold">
                        Norman Gordon
                    </Text>
                    <Text noOfLines={5} fontSize="sm" color="gray.500" mb={4} isTruncated>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas
                        diam in arcu. At volutpat diam ut venenatis tellus in metus vulputate eu.
                        Feugiat pretium nibh ipsum consequat.
                    </Text>

                    <Attributes title="Availability" badges={["40 hours"]} />
                    <Attributes
                        title="Focus/skills"
                        badges={["frontend", "ui/ux", "aws", "react"]}
                    />
                </VStack>
            </VStack>
        </Box>
    );
}

export default function Mentor() {
    return (
        <Flex alignItems="stretch">
            <Box
                display={["none", "block"]}
                minH={"100vh"}
                bgColor="gray.100"
                w="300px"
                flexShrink={0}
            />
            <Grid
                tw="gap-8 w-full items-center"
                p={[4, 8]}
                justifyItems="center"
                templateColumns="repeat(auto-fit, minmax(320px, 1fr))">
                {times(3).map((i) => (
                    <Card key={i} />
                ))}
            </Grid>
        </Flex>
    );
}
