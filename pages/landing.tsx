import "twin.macro";
import { css, keyframes } from "@emotion/react";
import { Box, Flex, Grid, Text, Image, UnorderedList, ListItem } from "@chakra-ui/react";

import { NavBar } from "components/modules/NavBar";
import { SearchBar } from "components/units/SearchBar";

const categories = [
    { name: "Coding", picture: "/images/coding.png", color: "#2f323b" },
    { name: "Coding", picture: "/images/coding.png", color: "#2f323b" },
    { name: "Coding", picture: "/images/coding.png", color: "#2f323b" },
    { name: "Coding", picture: "/images/coding.png", color: "#2f323b" },
] as const;

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

export default function Landing() {
    return (
        <Flex tw="p-0 h-screen" direction="column">
            <NavBar name="John" />
            <Box h="100%" w="100%" color="#2f323b">
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
                </Grid>
            </Box>
            <Box backgroundColor="F8FAFC" tw="m-0 p-0">
                <Text tw="relative w-full text-center justify-center items-center text-5xl top-full h-full">
                    Categories
                </Text>
                <Box tw="absolute w-full top-full bg-white flex flex-wrap justify-around items-center mt-16 h-1/2">
                    {categories.map(({ name, picture, color }) => (
                        <Box
                            key={name}
                            css={css`
                                min-width: 350px;
                                max-width: 350px;
                                height: 350px;
                                border-radius: 10px;
                                box-shadow: 2px 10px 12px rgba(0, 0, 0, 0.5);
                                justify-content: center;
                                align-items: center;
                                display: flex;
                                flex-direction: column;
                                :hover {
                                    transform: scale(1.03);
                                }
                            `}
                            bg={color}>
                            <Image src={picture} tw="align-top" />
                            <Text tw="text-2xl text-white mt-5">{name}</Text>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Flex>
    );
}
