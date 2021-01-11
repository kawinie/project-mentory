import { AppProps } from "next/app";
import { ReactElement } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { ScreenProvider } from "hooks";

const theme = extendTheme({
    colors: {
        "google-plus": {
            50: "#ffe8e4",
            100: "#f8c2bb",
            200: "#ed9b92",
            300: "#e57467",
            400: "#dc4d3d",
            500: "#c23423",
            600: "#98271a",
            700: "#6d1b13",
            800: "#440e09",
            900: "#1e0200",
        },
    },
});

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return (
        <ChakraProvider theme={theme} resetCSS={true}>
            <ScreenProvider screens={tailwindTheme`screens`}>
                <GlobalStyles />
                <Component tw="debug-screens" {...pageProps} />
            </ScreenProvider>
        </ChakraProvider>
    );
}
