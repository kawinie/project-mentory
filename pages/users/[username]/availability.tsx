import "twin.macro";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";

import { withLayout } from "utils/layout";
import { addApolloState, separateApolloCacheFromProps, initializeApollo } from "utils/apollo";

import query from "./gql/availability.gql";

import { UserPageLayout } from ".";

type AvailabilityProps = {
    username: string;
};

const Availability = withLayout(UserPageLayout, function ({ username }: AvailabilityProps) {
    const { data } = useQuery(query, { variables: { username } });
    return <pre tw="bg-blueGray-200 whitespace-pre-wrap">{JSON.stringify(data, null, 4)}</pre>;
});

export default Availability;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */
type Params = { username: string };

export const getStaticProps: GetStaticProps<AvailabilityProps, Params> = async (context) => {
    if (context.params == undefined) {
        return {
            notFound: true,
        };
    }

    const _layoutProps = Availability.retrievePropsFromLayoutDataRequirement(context);
    if (_layoutProps == undefined) {
        return {
            notFound: true,
        };
    }

    const { username } = context.params;
    const [layoutCache, layoutProps] = separateApolloCacheFromProps(_layoutProps);
    const client = initializeApollo(layoutCache);

    return addApolloState(client, {
        props: {
            username,
            layoutProps,
        },
    });
};

export { getStaticPaths } from ".";
