import "twin.macro";
import {
    Box,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { NavBar } from "components/modules/NavBar";

const answers = [
    {
        title: "What is Mentory?",
        text:
            "Mentory is an innovative online platform where people can get mentored by real industry experts in real-time instead of taking boring online courses asynchronously. This web app solves the problem of information overload by allowing experts to bring in their knowledge, experience, and insights to help people get from Point A to Point B as quickly as possible.",
        index: 0,
    },
    {
        title: "How can I become a Mentor?",
        text:
            "Any user on Mentory can become a mentor just by creating an account with us. You will then have to edit your profile and add times that you will be available to offer your services, and that's it! Now any user who visits your profile can schedule meeting times with you.",
        index: 1,
    },
    {
        title: "How can I get a Mentor?",
        text:
            'To find a mentor, either search for them through our navigation bar or through our landing page. From there, select a mentor by clicking on the "View" button. If this mentor looks good to you, go to the "Availability" tab and book either one or more meeting times. Once you have selected all the times you want, you can checkout and will receive an email with the meeting information!',
        index: 2,
    },
    {
        title: "How much does Mentory cost?",
        text:
            "Signing up for Mentory is absolutely free! The only cost is choosing meeting times from a mentor, who will decide the price for their service.",
        index: 3,
    },
];

export default function Faq() {
    const username = useSelector((state) => state.currentUsername);

    return (
        <VStack
            alignContent="center"
            spacing="100px"
            background="trueGray.100"
            tw="h-screen"
            h="full">
            <Box tw="sticky top-0 z-50" w="full">
                <NavBar username={username ?? ""} />
            </Box>
            <Box w="75%">
                <span tw="text-2xl font-bold text-left">Frequently Asked Questions</span>
            </Box>
            <Box bg="#FFFFFF" w="75%" tw="border-2 rounded-lg">
                <Accordion defaultIndex={[0]} px={8} py={0} h="100%" mt="-2px" mb="-2px" top="0px">
                    {answers.map(({ title, text, index }) => (
                        <AccordionItem key={index}>
                            <h2>
                                <AccordionButton
                                    h="125px"
                                    _hover={{ textDecoration: "none" }}
                                    w="full">
                                    <Box flex="1" textAlign="left" tw="text-2xl">
                                        {title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} tw="text-lg">
                                {text}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
        </VStack>
    );
}
