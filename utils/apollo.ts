import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { GetStaticPropsResult } from "next";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const CONTENT_SERVER_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // set to true for SSR
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `${CONTENT_SERVER_URL}/graphql`,
        }),
    });
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addApolloState<T>(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: GetStaticPropsResult<T>
) {
    if ("props" in pageProps) {
        return {
            ...pageProps,
            props: { ...pageProps.props, [APOLLO_STATE_PROP_NAME]: client.cache.extract() },
        };
    }

    return pageProps;
}

export const extractApolloCacheFromProps = ({
    [APOLLO_STATE_PROP_NAME]: apolloCache,
    ...props
}: any) => [apolloCache, props];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(pageProps: any) {
    const [state, props] = extractApolloCacheFromProps(pageProps);
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
