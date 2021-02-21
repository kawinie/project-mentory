import "twin.macro";
import Head from "next/head";
import Link from "next/link";
import { Button, Container, Heading, Text } from "@chakra-ui/react";

import { MentorCard, MentorCardProps } from "components/modules/MentorCard";

/* -------------------------------------------------------------------------- */
/*                                  Mock Data                                 */
/* -------------------------------------------------------------------------- */

const mentor: Omit<MentorCardProps, "variant"> = {
    fullname: "Bjarne Stroustrup",
    profileImg: "/images/bjarne.jpg",
    badge: "Top Mentor",
    location: "New York, NY",
    expInYears: 40,
    status: "Too busy saving the world from evil coders",
    tags: [
        "software engineer",
        "c++ creator",
        "c++23",
        "c++20",
        "c++17",
        "c++14",
        "c++11",
        "c++98",
    ],
    avgReviewScore: 4.3,
    noEndorsements: 93,
    noReviews: 127,

    brief:
        "In 1979, Stroustrup began his career as a member of technical staff in the Computer Science Research Center of Bell Labs in Murray Hill, New Jersey, USA. There, he began his work on C++ and programming techniques",
};

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {
    const title = `Mentory ${process.env.NODE_ENV == "development" ? "(development)" : ""}`;
    return (
        <Container tw="h-screen" justifyContent="center" centerContent>
            <Head>
                <title>{title}</title>
            </Head>
            <Heading fontSize="5xl">
                <Link href="/landing" passHref>
                    Mentory
                </Link>
            </Heading>
            <Text mt={8} color="gray.500" align="center">
                Mentory is an innovative online platform where people can get mentored by real
                industry experts in real-time instead of taking boring online courses.
            </Text>
            <Link href="/login" passHref>
                <Button mt={8} w={32} as="a" _hover={{ textDecor: "none" }}>
                    Log in
                </Button>
            </Link>

            <Link href="/mentor-listing" passHref>
                <Button mt={8} w={32} as="a" _hover={{ textDecor: "none" }}>
                    Mentor List
                </Button>
            </Link>
            <MentorCard {...mentor} variant="desktop" />
        </Container>
    );
}
