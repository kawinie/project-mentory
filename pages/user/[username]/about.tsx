import "twin.macro";
import { GetStaticPropsContext, GetStaticPaths, GetStaticPropsResult, GetStaticProps } from "next";
import { gql, useQuery } from "@apollo/client";

import { withLayout } from "utils/layout";
import { addApolloState, extractApolloCacheFromProps, initializeApollo } from "utils/apollo";

import { UserPageLayout } from ".";

const query = gql`
    query User($firstname: String, $lastname: String) {
        users: userInfos(where: { firstname: $firstname, lastname: $lastname }) {
            about
            customProfileSections {
                title
                content
                img {
                    url
                }
            }
        }
    }
`;

type AboutProps = {
    firstname: string;
    lastname: string;
};

const About = withLayout(UserPageLayout, function ({ firstname, lastname }: AboutProps) {
    const { data } = useQuery(query, { variables: { firstname, lastname } });
    return <pre tw="bg-blueGray-200 whitespace-pre-wrap">{JSON.stringify(data, null, 4)}</pre>;
});

export default About;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */
type Params = { username: string };

export const getStaticProps: GetStaticProps<AboutProps, Params> = async (context) => {
    const [firstname, lastname] = context.params?.username?.split(".") ?? [];
    if (firstname == undefined || lastname == undefined) {
        return {
            notFound: true,
        };
    }

    const getLayoutProps = async () => {
        if (About.requiredLayoutData) {
            const result = await About.requiredLayoutData(context);
            if ("props" in result) {
                return result.props;
            }
        }

        return {};
    };

    const [cache, layoutProps] = extractApolloCacheFromProps(await getLayoutProps());
    const client = initializeApollo(cache);

    client.query({ query, variables: { firstname, lastname } });

    return addApolloState(client, {
        props: {
            firstname,
            lastname,
            layoutProps,
        },
    });

    // if (About.requiredLayoutData) {
    //     const data = await About.requiredLayoutData(context);
    //     if ("props" in data) {
    //         const [cache, layoutProps] = extractApolloCacheFromProps(data.props);
    //         const client = initializeApollo(cache);

    //         return addApolloState(client, {
    //             props: {
    //                 layoutProps,
    //             },
    //         });
    //     }
    // }

    // return {
    //     props: {},
    // };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const toPaths = (...us: string[]) => us.map((username) => ({ params: { username } }));
    return {
        paths: toPaths("bjarne.stroustrup"),
        fallback: "blocking",
    };
};
