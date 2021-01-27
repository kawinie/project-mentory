import { AppProps } from "next/app";
import { ReactElement } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";

import { ScreenProvider } from "hooks";
import theme from "theme";
import Fonts from "theme/fonts";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return (
        <ScreenProvider screens={tailwindTheme`screens`}>
            <GlobalStyles />
            <Fonts />
            <ChakraProvider theme={theme}>
                <Component tw="debug-screens" {...pageProps} />
            </ChakraProvider>
        </ScreenProvider>
    );
}
