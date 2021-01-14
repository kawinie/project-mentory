import "twin.macro";
import Image from "next/image";
import { Box, Flex, VStack, HStack, Grid, Text, Badge, AspectRatio } from "@chakra-ui/react";
import { shuffle, times } from "lodash";

function avatarPath(i: number) {
    return `/svg/avatar-${i}.svg`;
}

type TabButtonProps = {
    isActive?: boolean;
};

function TabButton({ isActive }: TabButtonProps) {
    const color = isActive ? "#DC6450" : "gray.400";
    return (
        <Flex
            tw="border rounded-full w-4 h-4 items-center justify-center"
            borderColor={color}
            color={color}
            _hover={{ cursor: "pointer" }}>
            <Box bgColor="currentcolor" rounded="full" w={"0.625rem"} h={"0.625rem"}></Box>
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

function ImageDisplay({ image }: { image: string }) {
    return (
        <Flex direction="column">
            {/* sizes=100% is needed here to make next/image work properly */}
            <AspectRatio tw="relative w-full" ratio={1} bgColor="gray.100">
                <Image src={image} sizes="100%" layout="fill" objectFit="contain" />
            </AspectRatio>

            <HStack tw="border border-t-0 border-b-0" p={4} pb={0} spacing={2}>
                <TabButton isActive />
                <TabButton />
                <TabButton />
                <TabButton />
                <TabButton />
            </HStack>
        </Flex>
    );
}

function Card({ image }: { image: string }) {
    return (
        <Box tw="rounded-xl overflow-hidden" maxW="400px">
            <ImageDisplay image={image} />

            <VStack tw="border border-t-0" px={4} py={6} align="start" spacing={4}>
                <Text tw="w-full text-xs" color="gray.500" mb={-2}>
                    <span tw="text-teal-500">SOFTWARE ENGINEER</span> (OR, USA)
                </Text>
                <Text tw="leading-none" fontSize="3xl" fontFamily="Raleway" fontWeight="bold">
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

export default function Mentor() {
    return (
        <Flex alignItems="stretch">
            <Box
                display={["none", "block"]}
                minH="100vh"
                bgColor="gray.100"
                w="300px"
                flexShrink={0}
            />
            <Grid
                tw="gap-8 w-full items-center"
                p={[4, 8]}
                justifyItems="center"
                justifyContent="center"
                templateColumns="repeat(auto-fit, minmax(320px, 1fr))">
                {shuffle(times(16))
                    .slice(0, 12)
                    .map((i) => avatarPath(i))
                    .map((image) => (
                        <Card key={image} image={image} />
                    ))}
            </Grid>
        </Flex>
    );
}
