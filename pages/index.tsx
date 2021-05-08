import "twin.macro";
import Head from "next/head";
import Link from "next/link";
import { Button, Container, Heading, Text } from "@chakra-ui/react";

import { Review } from "components/modules/Review";
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
            <Text mt={8} color="blueGray.500" align="center">
                Mentory is an innovative online platform where people can get mentored by real
                industry experts in real-time instead of taking boring online courses.
            </Text>
            <Link href="/login" passHref>
                <Button mt={8} w={32} as="a" variant="outline" _hover={{ textDecor: "none" }}>
                    Log in
                </Button>
            </Link>

            <Link href="/mentor-listing" passHref>
                <Button mt={8} w={32} as="a" _hover={{ textDecor: "none" }}>
                    Mentor List
                </Button>
            </Link>
        </Container>
    );
}
