import { Box, Flex, VStack, HStack, Grid, Heading, Text, Badge } from "@chakra-ui/react";
import "twin.macro";
import Image from "next/image";

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

function Card() {
    return (
        <Box tw="border rounded-lg">
            <VStack align="start">
                <VStack w="full" align="start" spacing={4}>
                    <Box tw="border relative" w="100%" h="202.5px" bgColor="gray.100">
                        {/* sizes=100% is needed here to make next/image work properly */}
                        <Image src="/svg/avatar.svg" sizes="100%" layout="fill" objectFit="cover" />
                    </Box>
                    <HStack px={4} spacing={2}>
                        <TabButton isActive />
                        <TabButton />
                        <TabButton />
                        <TabButton />
                        <TabButton />
                    </HStack>
                </VStack>

                <VStack p={4} align="start" spacing={4}>
                    <VStack align="start">
                        <Text fontSize="xs" color="gray.500" mb={-2}>
                            SOFTWARE ENGINEER (OR, USA)
                        </Text>
                        <Heading tw="text-3xl leading-none" letterSpacing={1} fontWeight="bold">
                            Norman Gordon
                        </Heading>
                        <Text noOfLines={5} fontSize="sm" isTruncated>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Congue quisque
                            egestas diam in arcu. At volutpat diam ut venenatis tellus in metus
                            vulputate eu. Feugiat pretium nibh ipsum consequat.
                        </Text>
                    </VStack>

                    <VStack align="start">
                        <Text textTransform="uppercase" fontSize="xs" fontWeight="bold">
                            Availability
                        </Text>
                        <HStack>
                            {["40 hours"].map((t) => (
                                <Badge key={t} rounded="md" fontWeight="normal" color="gray.500">
                                    {t}
                                </Badge>
                            ))}
                        </HStack>
                    </VStack>

                    <VStack align="start">
                        <Text textTransform="uppercase" fontSize="xs" fontWeight="bold">
                            Focus
                        </Text>
                        <HStack>
                            {["fontend", "react", "aws", "ui/ui"].map((t) => (
                                <Badge key={t} rounded="md" fontWeight="normal" color="gray.500">
                                    {t}
                                </Badge>
                            ))}
                        </HStack>
                    </VStack>
                </VStack>
            </VStack>
        </Box>
    );
}

export default function Mentor() {
    return (
        <HStack alignItems="stretch">
            <Box minH={"100vh"} bgColor="gray.100" w="300px" flexShrink={0}></Box>
            <Grid
                alignItems="center"
                templateColumns="repeat(auto-fit, minmax(360px, 1fr))"
                w="full"
                gap={8}
                p={8}>
                <Card />
                <Card />
                <Card />
            </Grid>
        </HStack>
    );
}
