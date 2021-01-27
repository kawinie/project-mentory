import Link from "next/link";
import Head from "next/head";
import "twin.macro";
import { useForm } from "react-hook-form";
import { TwitterLogo, FacebookLogo, LinkedinLogo, SignIn } from "phosphor-react";
import { css, jsx, keyframes } from "@emotion/react";
import {
    Box,
    Button,
    ButtonProps,
    Container,
    Flex,
    Grid,
    Text,
    Heading,
    Divider,
    IconButton,
    VStack,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";
import { NavBar } from "components/modules/NavBar";

const colors = require("tailwindcss/colors");

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
            <NavBar name="Toshiki" />
            <Box h="100%" w="100%">
                <Grid
                    top="50%"
                    tw="absolute h-auto w-4/5 m-auto left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl text-center overflow-hidden">
                    <Text tw="relative flex w-full text-center justify-center overflow-hidden">
                        Get Quality Mentorship For Your
                        <div
                            css={css`
                                position: relative;
                                height: 85px;
                                width: auto;
                                overflow: hidden;
                            `}>
                            <ul
                                tw="relative ml-5 p-0 text-left overflow-hidden"
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
                            </ul>
                        </div>
                    </Text>
                </Grid>
            </Box>
            <Box backgroundColor="F8FAFC">
                <Grid backgroundColor="F8FAFC">
                    <Text tw="absolute left-1/4 text-4xl">Categories</Text>
                </Grid>
            </Box>
        </Flex>
    );
}
