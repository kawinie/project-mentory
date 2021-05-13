import "twin.macro";
import { GetStaticProps } from "next";
import { Badge } from "@chakra-ui/react";

import { withLayout } from "utils/layout";
import { initializeApollo } from "utils/apollo";

import query from "./gql/tags.gql";

import { UserPageLayout } from ".";

type TagsProps = {
    tags: {
        tag: {
            label: string;
        };
    }[];
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

const Tags = withLayout(UserPageLayout, function ({ tags }: TagsProps) {
    return (
        <div>
            {tags.map((tag, index: number) => (
                <Badge ml="3" fontSize="md" colorScheme={Color[index]} key={tag.tag.label}>
                    {tag.tag.label}
                </Badge>
            ))}
        </div>
    );
});

export default Tags;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */

type Params = { username: string };

export const getStaticProps: GetStaticProps<TagsProps, Params> = async (context) => {
    if (context.params == undefined) {
        return { notFound: true };
    }

    const client = initializeApollo();
    const variables = { username: context.params.username };
    const { data, error } = await client.query({ query, variables });
    if (error || data.users == null || data.users.length == 0) {
        return { notFound: true };
    }

    const layoutProps = await Tags.retrievePropsFromLayoutDataRequirement(context);

    return {
        props: {
            ...data.users[0],
            layoutProps,
        },
    };
};

// Use the same static paths as main layout
export { getStaticPaths } from "./index";
