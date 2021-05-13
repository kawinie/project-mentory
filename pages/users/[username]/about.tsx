import "twin.macro";
import Image from "next/image";
import { GetStaticProps } from "next";
import { Stack, Box, VStack, Text, AspectRatio } from "@chakra-ui/react";

import { withLayout } from "utils/layout";
import { strapiImgLoader } from "utils/strapi";
import { initializeApollo } from "utils/apollo";

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
    about: string;
    profileSections: {
        title: string;
        content: string;
        img: {
            url: string;
        };
    }[];
};

const About = withLayout(UserPageLayout, function ({ about, profileSections }: AboutProps) {
    return (
        <VStack spacing={12} alignItems="stretch">
            <Section title="About" content={about} />
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
    if (context.params == undefined) {
        return { notFound: true };
    }

    const client = initializeApollo();
    const variables = { username: context.params.username };
    const { data, error } = await client.query({ query, variables });

    if (error || data.users == null || data.users.length == 0) {
        return { notFound: true };
    }

    const layoutProps = await About.retrievePropsFromLayoutDataRequirement(context);
    return {
        props: {
            ...data.users[0],
            layoutProps,
        },
    };
};

// Use the same static paths as main layout
export { getStaticPaths } from "./index";
