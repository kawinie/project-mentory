import { AppProps } from "next/app";
import { ReactElement, useEffect, useState } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import Cookie from "js-cookie";

import { ScreenProvider } from "hooks";
import theme from "theme";
import Fonts from "theme/fonts";

import { useApollo } from "../utils/apollo";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    const apolloClient = useApollo(pageProps.initialApolloState);

    const [user, setUser] = useState(null);

    useEffect(() => {
        // grab token value from cookie
        const token = Cookie.get("token");

        if (token) {
            // authenticate the token on the server and place set user object
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async (res) => {
                // if res comes back not valid, token is not valid
                // delete the token and log the user out on client
                if (!res.ok) {
                    Cookie.remove("token");
                    setUser(null);
                    return null;
                }
                const newUser = await res.json();
                setUser(newUser);
            });
        }
    }, []);

    return (
        <ApolloProvider client={apolloClient}>
            <ScreenProvider screens={tailwindTheme`screens`}>
                <GlobalStyles />
                <Fonts />
                <ChakraProvider theme={theme}>
                    <Component tw="debug-screens" {...pageProps} />
                </ChakraProvider>
            </ScreenProvider>
        </ApolloProvider>
    );
}
