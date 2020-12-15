import { GlobalStyles } from "twin.macro";
import { AppProps } from "next/app";
import { ReactElement } from "react";

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return (
        <div>
            <GlobalStyles />
            <Component {...pageProps} />
        </div>
    );
}
