import "twin.macro";
import Image from "next/image";
import {
    Box,
    Flex,
    VStack,
    HStack,
    Grid,
    Text,
    Link,
    Badge,
    AspectRatio,
    Button,
} from "@chakra-ui/react";
import { shuffle, times } from "lodash";
import { Star } from "phosphor-react";

import { NavBar } from "components/modules/NavBar";
import { MentorFilterSidebar } from "components/modules/MentorFilterSidebar";

function avatarPath(i: number) {
    return `/svg/avatar-${i}.svg`;
}

type TabButtonProps = {
    isActive?: boolean;
};

function TabButton({ isActive }: TabButtonProps) {
    return (
        <Box
            tw="hover:(cursor-pointer bg-gray-200) active:(bg-white)"
            rounded="full"
            w={8}
            h={2}
            bgColor={isActive ? "white" : "gray.400"}></Box>
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
                    <Badge key={text} rounded="full" px={2} py={1} color="gray.500">
                        {text}
                    </Badge>
                ))}
            </HStack>
        </VStack>
    );
}

function ImageDisplay({ image }: { image: string }) {
    return (
        <Box tw="relative overflow-hidden" className="group">
            <AspectRatio tw="relative w-full" ratio={4 / 3} bgColor="gray.100">
                <Image src={image} sizes="100%" layout="fill" objectFit="cover" />
            </AspectRatio>
            <Button
                tw="absolute top-0 right-0 text-gray-200 rounded-none rounded-bl-xl"
                bgColor="rgba(0,0,0,0.5)"
                boxShadow="1px 4px 8px 0 rgba(0,0,0,0.1)"
                leftIcon={<Star tw="text-yellow-500" weight="fill" size={16} />}
                fontSize="sm"
                _hover={{ cursor: "default" }}
                _active={{}}>
                4.4 (125)
            </Button>
            <HStack
                tw="absolute bottom-0 w-full border-none transition delay-200 transform opacity-0 translate-y-full group-hover:(translate-y-0 opacity-100)"
                bgColor="rgba(0,0,0,0.50)"
                p={4}
                justify="center"
                spacing={2}>
                <TabButton isActive />
                <TabButton />
                <TabButton />
                <TabButton />
                <TabButton />
            </HStack>
        </Box>
    );
}

function ImageSection({ image }: { image: string }) {
    return (
        <Flex direction="column">
            {/* sizes=100% is needed here to make next/image work properly */}
            <ImageDisplay image={image} />
        </Flex>
    );
}

function Card({ image }: { image: string }) {
    return (
        <Box
            tw="rounded-xl overflow-hidden"
            maxW="300px"
            boxShadow="1px 4px 16px 0 rgba(0,0,0,0.1)">
            <ImageSection image={image} />

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

export default function Mentor() {
    return (
        <Flex alignItems="stretch" bgColor="trueGray.50">
            <VStack>
                <NavBar name="John" />
                <HStack w="100vw" pt="80px">
                    <Box
                        display="block"
                        minH="100vh"
                        bgColor="trueGray.50"
                        w="300px"
                        flexShrink={0}>
                        <MentorFilterSidebar />
                    </Box>
                    <VStack tw="w-full">
                        <HStack tw="w-full">
                            <Text tw="text-2xl" color="primary">
                                Search Results For &quot;programming&quot;
                            </Text>
                            <Link href="/mentor" color="purple" tw="pl-4 text-sm underline">
                                x Clear All Filters
                            </Link>
                        </HStack>
                        <Text tw="w-full text-xs" color="primary">
                            32 RESULTS
                        </Text>
                        <Grid
                            tw="gap-4 w-full items-center"
                            p={[4, 8]}
                            justifyItems="center"
                            justifyContent="center"
                            templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
                            {shuffle(times(16))
                                .slice(0, 12)
                                .map((i) => avatarPath(i))
                                .map((image) => (
                                    <Card key={image} image={image} />
                                ))}
                        </Grid>
                    </VStack>
                </HStack>
            </VStack>
        </Flex>
    );
}
