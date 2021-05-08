import "twin.macro";
import merge from "deepmerge";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import { Grid, Box, Badge, Text, AspectRatio } from "@chakra-ui/react";

import { withLayout } from "utils/layout";
import {
    addApolloState,
    combineMerge,
    separateApolloCacheFromProps,
    initializeApollo,
} from "utils/apollo";

import query from "./gql/tags.gql";

import { UserPageLayout } from ".";

type TagsProps = {
    username: string;
};

type CustomProps = {
    tag: {
        label: string;
    };
};

const Color = [
    "blue",
    "cyan",
    "gray",
    "green",
    "orange",
    "pink",
    "purple",
    "red",
    "teal",
    "yellow",
    "whiteAlpha",
    "blackAlpha",
    "linkedin",
    "facebook",
    "messenger",
    "whatsapp",
    "twitter",
    "telegram",
];

const Tags = withLayout(UserPageLayout, function ({ username }: TagsProps) {
    const { data } = useQuery(query, { variables: { username } });
    const user = data.users[0];

    return (
        <div>
            {user.tags.map((t: CustomProps, index: number) => (
                <Badge ml="3" fontSize="md" colorScheme={Color[index]} key={t.tag.label}>
                    {t.tag.label}
                </Badge>
            ))}
        </div>
    );
});

export default Tags;

type Params = { username: string };

export const getStaticProps: GetStaticProps<TagsProps, Params> = async (context) => {
    // Null guard
    if (context.params == undefined) {
        return { notFound: true };
    }

    // Query data specially for this route
    const { username } = context.params;
    const client = initializeApollo();
    await client.query({ query, variables: { username } });

    // Get return props from layout data fetching method and extract cache from layout props if any
    const result = (await Tags.retrievePropsFromLayoutDataRequirement(context)) ?? {};
    const [layoutApolloCache, layoutProps] = separateApolloCacheFromProps(result);

    // Extract the cache from the most recent query and combine it with the cache from the layout dependency
    if (layoutApolloCache) {
        const mergeOption = { arrayMerge: combineMerge };
        const mergedCache = merge(layoutApolloCache, client.extract(), mergeOption);
        client.restore(mergedCache);
    }

    // Send the merged cache together with props for layout and this page
    return addApolloState(client, {
        props: {
            username,
            layoutProps,
        },
    });
};

// Use the same static paths as main layout
export { getStaticPaths } from "./index";
