import "twin.macro";
import { css, keyframes } from "@emotion/react";
import {
    Box,
    Flex,
    Grid,
    Text,
    UnorderedList,
    HStack,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    VStack,
    Divider,
    Heading,
} from "@chakra-ui/react";
import {
    CaretDown,
    ListPlus,
    HandPointing,
    Handshake,
    PencilCircle,
    Code,
    SuitcaseSimple,
    EyeClosed,
    Heartbeat,
} from "phosphor-react";

import { SearchBar } from "components/units/SearchBar";

const categories = [
    { name: "Design", picture: <PencilCircle color="#374151" size={64} /> },
    { name: "Programming", picture: <Code color="#374151" size={64} /> },
    { name: "Business", picture: <SuitcaseSimple color="#374151" size={64} /> },
    { name: "Makeup", picture: <EyeClosed color="#374151" size={64} /> },
    { name: "Life", picture: <Heartbeat color="#374151" size={64} /> },
] as const;

const info = [
    {
        text: "Either search or choose from a diverse list of categories you want help in",
        picture: <ListPlus size={48} />,
        index: "1",
    },
    {
        text: "Pick a mentor that best suits your individual needs",
        picture: <HandPointing size={48} />,
        index: "2",
    },
    {
        text: "Meet with your mentor and receive professional advice",
        picture: <Handshake size={48} />,
        index: "3",
    },
];

const animate = keyframes`
    0%{
        transform: translateY(0rem);
    }
    8.33%{
        transform: translateY(-7rem);
    }
    16.67%{
        transform: translateY(-7rem);
    }
    25%{
        transform: translateY(-14rem);
    }
    33.33%{
        transform: translateY(-14rem);
    }
    41.67%{
        transform: translateY(-21rem);
    }
    50%{
        transform: translateY(-21rem);
    }
    58.33%{
        transform: translateY(-28rem);
    }
    66.67%{
        transform: translateY(-28rem);
    }
    75%{
        transform: translateY(-35rem);
    }
    83.33%{
        transform: translateY(-35rem);
    }
    91.67%, 100%{
        transform: translateY(-42rem);
    }
`;

const LandingNavBar = () => {
    return (
        <Flex bg="white" w="50%" h="70px" top="550px" position="absolute" left="25%">
            <HStack spacing={4} tw="flex w-full justify-center" h="full">
                <Box h="48px" w="full">
                    <SearchBar name="search" placeholder="Search..." />
                </Box>
                <Menu>
                    <MenuButton
                        tw="inline-block h-12 text-sm text-left min-w-min"
                        as={Button}
                        variant="outline"
                        rightIcon={<CaretDown tw="inline" />}>
                        Categories
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Design</MenuItem>
                        <MenuItem>Programming</MenuItem>
                        <MenuItem>Business</MenuItem>
                        <MenuItem>Makeup</MenuItem>
                        <MenuItem>Life</MenuItem>
                    </MenuList>
                </Menu>
                <Button
                    bg="#374151"
                    color="white"
                    tw="block h-12 min-w-min"
                    _hover={{ textDecoration: "none" }}>
                    Search
                </Button>
            </HStack>
        </Flex>
    );
};

export default function Landing() {
    return (
        <Flex tw="p-0 h-screen relative" direction="column">
            <Heading
                letterSpacing="wide"
                color="black"
                bg="#faf8fc"
                h="100px"
                tw="font-medium top-0 px-4 py-2">
                <Link href="/" whiteSpace="nowrap" _hover={{ textDecoration: "none" }} passHref>
                    Mentory
                </Link>
            </Heading>
            <Box
                h="450px"
                w="100%"
                color="#2f323b"
                bg="#faf8fc"
                top="100px"
                tw="absolute align-middle">
                <Grid
                    top="50%"
                    fontSize="3.5vw"
                    tw="absolute h-auto w-4/5 m-auto left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <Text tw="relative flex w-full text-center justify-center">
                        Get Quality Mentorship For Your
                        <div
                            css={css`
                                position: relative;
                                height: 100px;
                                width: auto;
                                overflow: hidden;
                            `}>
                            <UnorderedList
                                tw="relative p-0 w-full ml-5 text-left flex-wrap align-top justify-center items-center"
                                css={css`
                                    animation: ${animate} 15s linear infinite;
                                `}>
                                <li tw="list-none h-28 text-red-500">Team</li>
                                <li tw="list-none h-28 text-pink-500">Project</li>
                                <li tw="list-none h-28 text-blue-500">Work</li>
                                <li tw="list-none h-28 text-indigo-500">School</li>
                                <li tw="list-none h-28 text-green-500">Self</li>
                                <li tw="list-none h-28 text-purple-500">Business</li>
                                <li tw="list-none h-28 text-red-500">Team</li>
                            </UnorderedList>
                        </div>
                    </Text>
                    <Link href="/signup" passHref _hover={{ textDecoration: "none" }}>
                        <Button
                            size="lg"
                            aria-label="sign-up"
                            colorScheme="purple"
                            _hover={{ textDecoration: "none" }}
                            tw="mx-auto">
                            Sign Up Here
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <LandingNavBar />
            <VStack tw="absolute" top="620px" width="100%" spacing={24}>
                <VStack tw="w-3/4 pt-16">
                    <Text
                        tw="block mr-auto pb-10"
                        color="#374151"
                        fontSize="50px"
                        fontWeight="medium">
                        Categories
                    </Text>
                    <HStack width="100%" spacing={8}>
                        {categories.map(({ name, picture }) => (
                            <Box
                                key={name}
                                height="150px"
                                width="300px"
                                minWidth="146px"
                                bg="white"
                                border="2px"
                                borderColor="#374151"
                                tw="rounded-xl align-middle pt-4"
                                _hover={{ transform: "scale(1.01)" }}>
                                <VStack spacing={4}>
                                    {picture}
                                    <Text color="#374151" fontSize="24px">
                                        {name}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </HStack>
                </VStack>
                <Divider tw="w-5/6" />
                <VStack tw="w-3/4 justify-center align-middle" textAlign="left">
                    <Text
                        tw="block mr-auto pb-10"
                        color="#374151"
                        fontSize="50px"
                        fontWeight="medium">
                        Get 1 on 1 Mentoring
                    </Text>
                    <HStack textAlign="left" tw="mr-auto align-middle pb-24" spacing={24}>
                        {info.map(({ text, picture, index }) => (
                            <VStack key={index}>
                                <Box tw="mr-auto">{picture}</Box>
                                <Text tw="block mr-auto ml-5" color="#374151" fontSize="24px">
                                    {text}
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </VStack>
            </VStack>
        </Flex>
    );
}
