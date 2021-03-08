import { AppProps } from "next/app";
import { ReactElement, useEffect, useState } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import { Global } from "@emotion/react";
import { NextComponentType, NextPageContext } from "next";

import { ScreenProvider } from "hooks";
import theme from "theme";
import fonts from "theme/fonts";
import { ComponentWithLayout } from "utils/layout";

import { store } from "../redux/store";
import { useApollo } from "../utils/apollo";

interface CustomApp<P = Record<string, unknown>> extends AppProps<P> {
    Component: NextComponentType<NextPageContext, unknown, P> & ComponentWithLayout;
}

export default function MyApp({ Component, pageProps }: CustomApp): ReactElement {
    const apolloClient = useApollo(pageProps);
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

    const mergeWithLayout = Component.mergeWithLayout ?? ((page: ReactElement) => page);
    const layoutProps = Component.mergeWithLayout ? pageProps.layoutProps : {};

    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <ScreenProvider screens={tailwindTheme`screens`}>
                    <Global styles={fonts} />
                    <GlobalStyles />
                    <ChakraProvider theme={theme}>
                        <div tw="debug-screens" />
                        {mergeWithLayout(<Component {...pageProps} />, layoutProps)}
                    </ChakraProvider>
                </ScreenProvider>
            </ApolloProvider>
        </Provider>
    );
}
