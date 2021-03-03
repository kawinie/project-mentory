import { AppProps } from "next/app";
import { ReactElement } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Global } from "@emotion/react";

import { ScreenProvider } from "hooks";
import theme from "theme";
import fonts from "theme/fonts";

import { useApollo } from "../utils/apollo";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <ScreenProvider screens={tailwindTheme`screens`}>
                <Global styles={fonts} />
                <GlobalStyles />
                <ChakraProvider theme={theme}>
                    <div tw="debug-screens" />
                    <Component {...pageProps} />
                </ChakraProvider>
            </ScreenProvider>
        </ApolloProvider>
    );
}
