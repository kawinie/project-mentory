import { AppProps } from "next/app";
import { ReactElement } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import { ScreenProvider } from "hooks";
import theme from "theme";
import Fonts from "theme/fonts";

import { useApollo } from "../utils/apollo";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    const apolloClient = useApollo(pageProps.initialApolloState);

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
