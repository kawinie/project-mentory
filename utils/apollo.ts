import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GetStaticPropsResult } from "next";
import deepmerge from "deepmerge";

const CONTENT_SERVER_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
    uri: `${CONTENT_SERVER_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // set to true for SSR
        cache: new InMemoryCache(),
        link: typeof window === "undefined" ? httpLink : authLink.concat(httpLink),
    });
}

// Recursively combine array
// More info at https://github.com/TehShrike/deepmerge
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const combineMerge = (target: any[], source: any[], options: any) => {
    const destination = target.slice();
    source.forEach((item, index) => {
        if (typeof destination[index] === "undefined") {
            destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
        } else if (options.isMergeableObject(item)) {
            destination[index] = deepmerge(target[index], item, options);
        } else if (target.indexOf(item) === -1) {
            destination.push(item);
        }
    });
    return destination;
};

export function initializeApollo(initialState?: NormalizedCacheObject) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = deepmerge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: combineMerge,
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
    pageResult: GetStaticPropsResult<T>
) {
    if ("props" in pageResult) {
        return {
            ...pageResult,
            props: { ...pageResult.props, [APOLLO_STATE_PROP_NAME]: client.cache.extract() },
        };
    }

    return pageResult;
}

export const separateApolloCacheFromProps = <T>({
    [APOLLO_STATE_PROP_NAME]: state,
    ...props
}: T & { [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject }) => [state, props] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(state: NormalizedCacheObject | undefined) {
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
