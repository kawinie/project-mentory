import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import { ReactElement, useEffect } from "react";
import { GlobalStyles, theme as tailwindTheme } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import { Global } from "@emotion/react";

import { ScreenProvider } from "hooks";
import { ComponentWithLayout } from "utils/layout";
import { separateApolloCacheFromProps, useApollo } from "utils/apollo";
import theme from "theme";
import fonts from "theme/fonts";
import { store } from "redux/store";
import { autheticateWithToken } from "lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { [key: string]: unknown };

interface MyAppProps<P = Props> extends AppProps<P> {
    Component: NextComponentType<NextPageContext, unknown, P> & ComponentWithLayout;
}

type Component = MyAppProps["Component"];
type CombinedProps<T> = T & { layoutProps?: Props; pageComponentProps?: Props };
const mergeWithLayout = <T extends Props>(Component: Component, props: CombinedProps<T>) => {
    const { layoutProps, ...componentProps } = props;
    return Component.layout ? (
        <Component.layout {...layoutProps}>
            <Component {...componentProps} />
        </Component.layout>
    ) : (
        <Component {...componentProps} />
    );
};

export default function MyApp({ Component, pageProps }: MyAppProps): ReactElement {
    const apolloClient = useApollo(pageProps);
    useEffect(() => {
        const token = Cookie.get("token");
        autheticateWithToken(token);
    }, []);

    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <ScreenProvider screens={tailwindTheme`screens`}>
                    <Global styles={fonts} />
                    <GlobalStyles />
                    <ChakraProvider theme={theme}>
                        <div tw="debug-screens" />
                        {mergeWithLayout(Component, pageProps)}
                    </ChakraProvider>
                </ScreenProvider>
            </ApolloProvider>
        </Provider>
    );
}
