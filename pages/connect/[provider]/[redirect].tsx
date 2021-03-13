import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Container, Heading, Spinner } from "@chakra-ui/react";
import "twin.macro";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export default function Connect() {
    const router = useRouter();
    const [text, setText] = useState("Hang tight...");

    const { provider, ...all } = router.query;
    const a = Object.keys(all)
        .map((k) => `${k}=${all[k]}`)
        .join("&");
    useEffect(() => {
        // Successfully logged with the provider
        // Now logging with strapi by using the access_token (given by the provider) in props.location.search
        fetch(`${API_URL}/auth/${provider}/callback?${a}`)
            .then((res) => {
                console.log(`${API_URL}/auth/${provider}/callback?a${a}`);
                if (res.status !== 200) {
                    throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
                }
                return res;
            })
            .then((res) => res.json())
            .then((res) => {
                // Successfully logged with Strapi
                // Now saving the jwt to use it for future authenticated requests to Strapi
                Cookie.set("token", res.jwt);

                Router.push("/landing");
            })
            .catch((err) => {
                console.log("Here is error: " + err);
                setText("An error occurred, please see the developer console.");
            });
    }, [provider]);

    return (
        <Container tw="h-screen" justifyContent="center" centerContent>
            <Heading tw="mb-4" fontSize="3xl">
                Hang tight...
            </Heading>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="purple.500"
                size="xl"
            />
        </Container>
    );
}
