import {
    GetStaticPaths,
    InferGetStaticPropsType,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from "next";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Box, Grid, GridProps, VStack } from "@chakra-ui/react";

import { Mentor } from "models";
import { NavBar } from "components/modules/NavBar";
import { ProfileImage } from "components/modules/MentorCard/components";
import { ProfileSection, MainSection } from "components/modules/MentorCard/variants/Base";
import { addApolloState, initializeApollo } from "utils/apollo";

const query = gql`
    query User($firstname: String, $lastname: String) {
        userInfos(where: { firstname: $firstname, lastname: $lastname }) {
            firstname
            lastname
            city
        }
    }
`;

// function TopSection({ mentor }: { mentor: Mentor }) {
//     const grid_layout: GridProps = {
//         templateAreas: `
//             "profile tags"
//             "profile main"
//         `,
//         templateColumns: `
//             150px 1fr
//         `,
//     };

//     return (
//         <Grid {...grid_layout}>
//             <ProfileSection img="/images/bjarne.jpg" gridArea="profile" />
//             <MainSection gridArea="main" fullname={`${mentor.firstname} ${mentor.lastname}`} />
//         </Grid>
//     );
// }

export default function MentorPage({
    firstname,
    lastname,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { data } = useQuery(query, { variables: { firstname, lastname } });
    const userInfo = data.userInfos[0];

    return (
        <Box>
            <NavBar username={userInfo.firstname} />
            {JSON.stringify(userInfo)}
            {/* <TopSection mentor={mentor} /> */}
        </Box>
    );
}

type PageProps = {
    firstname: string;
    lastname: string;
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ userId: string }>): Promise<GetStaticPropsResult<PageProps>> => {
    const [firstname, lastname] = params?.userId?.split(".") ?? [];
    console.log(firstname, lastname);
    if (firstname == undefined || lastname == undefined) {
        return {
            notFound: true,
        };
    }

    const { initializeApollo } = await import("utils/apollo");
    const client = initializeApollo();
    const response = await client.query({ query, variables: { firstname, lastname } });
    if (response.error || response.data.userInfos.length == 0) {
        return {
            notFound: true,
        };
    }

    return addApolloState(client, { props: { firstname, lastname } });
};

export const getStaticPaths: GetStaticPaths = async () => {
    // const client = initializeApollo();
    const toPaths = (userIds: string[]) => userIds.map((userId) => ({ params: { userId } }));

    return {
        paths: toPaths(["kawin.pechetratanapanit", "bjarne.stroustrup"]),
        fallback: true,
    };
};
