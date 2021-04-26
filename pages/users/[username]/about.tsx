import "twin.macro";
import Image from "next/image";
import merge from "deepmerge";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import { Stack, Box, VStack, Text, AspectRatio } from "@chakra-ui/react";

import { withLayout } from "utils/layout";
import { strapiImgLoader } from "utils/strapi";
import {
    addApolloState,
    combineMerge,
    separateApolloCacheFromProps,
    initializeApollo,
} from "utils/apollo";

import query from "./gql/about.gql";

import { UserPageLayout } from ".";

type CustomSectionProps = {
    title: string;
    content: string;
    img?: {
        url: string;
    };
};

function Section({ title, content, img }: CustomSectionProps) {
    return (
        <Stack direction="row" spacing={8}>
            <Box
                fontSize="sm"
                fontWeight="bold"
                color="text-primary-darker"
                maxW="250px"
                w="full"
                textAlign="right">
                {title}
            </Box>
            <VStack flexGrow={1} spacing={4} alignItems="start">
                {img && (
                    <AspectRatio w="full">
                        <Image
                            loader={strapiImgLoader}
                            src={img.url}
                            sizes="100%"
                            layout="fill"
                            objectFit="cover"
                        />
                    </AspectRatio>
                )}
                <Text
                    fontSize="sm"
                    as="pre"
                    whiteSpace="pre-wrap"
                    fontFamily="body"
                    color="text-primary"
                    maxW="80ch">
                    {content}
                </Text>
            </VStack>
        </Stack>
    );
}

type AboutProps = {
    username: string;
};

const About = withLayout(UserPageLayout, function ({ username }: AboutProps) {
    const { data } = useQuery(query, { variables: { username } });

    console.log(useQuery(query, { variables: { username } }));

    const user = data.users[0];

    const { profileSections } = user;
    return (
        <VStack spacing={12} alignItems="stretch">
            <Section title="About" content={user.about} />
            <Section title="Language" content="English" />
            {profileSections.map((section: CustomSectionProps) => (
                <Section key={section.title} {...section} />
            ))}
        </VStack>
    );
});

export default About;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */
type Params = { username: string };

export const getStaticProps: GetStaticProps<AboutProps, Params> = async (context) => {
    // Null guard
    if (context.params == undefined) {
        return { notFound: true };
    }

    // Query data specially for this route
    const { username } = context.params;
    const client = initializeApollo();
    await client.query({ query, variables: { username } });

    // Get return props from layout data fetching method and extract cache from layout props if any
    const result = (await About.retrievePropsFromLayoutDataRequirement(context)) ?? {};
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
export { getStaticPaths } from ".";
