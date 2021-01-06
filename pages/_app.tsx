import { AppProps } from "next/app";
import { ReactElement } from "react";
import { GlobalStyles, theme } from "twin.macro";

import { MinScreenProvider } from "hooks";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return (
        <MinScreenProvider screens={theme`screens`}>
            <GlobalStyles />
            <div tw="debug-screens">
                <Component {...pageProps} />
            </div>
        </MinScreenProvider>
    );
}
