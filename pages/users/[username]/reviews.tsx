import {
    HStack,
    VStack,
    Box,
    Button,
    Menu,
    MenuButton as _MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
} from "@chakra-ui/react";
import merge from "deepmerge";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GetStaticProps } from "next";

import { withLayout } from "utils/layout";
import {
    addApolloState,
    combineMerge,
    separateApolloCacheFromProps,
    initializeApollo,
} from "utils/apollo";
import { Review } from "components/modules/Review";

import query from "./gql/reviews.gql";

import { UserPageLayout } from ".";

type ReviewProps = {
    username: string;
};

function ReviewFilterMenu({ ...props }) {
    const common = {
        w: "100%",
        variant: "outline",
        _focus: { shadow: "none", outline: "none" },
        ...props,
    };

    return (
        <Menu closeOnSelect={false}>
            <_MenuButton as={Button} {...common}>
                {props.filterOption + "..."}
            </_MenuButton>
            <MenuList minWidth="240px">
                <MenuOptionGroup
                    defaultValue={props.filterOption}
                    title="Filter Options"
                    type="radio">
                    <MenuItemOption
                        value="Most recent"
                        onClick={() => props.updateFunction("Most recent")}>
                        Most recent
                    </MenuItemOption>
                    <MenuItemOption value="Oldest" onClick={() => props.updateFunction("Oldest")}>
                        Oldest
                    </MenuItemOption>
                    <MenuItemOption
                        value="Most helpful"
                        onClick={() => props.updateFunction("Most helpful")}>
                        Most helpful
                    </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
}

const Reviews = withLayout(UserPageLayout, function ({ username }: ReviewProps) {
    const { data } = useQuery(query, { variables: { username } });
    const reviews = data.reviews;
    console.log(useQuery(query, { variables: { username } }));
    console.log(reviews);

    const [filter, setFilter] = useState("Most recent");

    function updateFunction(chosenFilter: string) {
        setFilter(chosenFilter);
    }

    function compare(a: any, b: any) {
        let elementA;
        let elementB;
        console.log(filter);
        if (filter === "Most recent" || filter === "Oldest") {
            elementA = a.published_at.toUpperCase();
            elementB = b.published_at.toUpperCase();
            console.log(elementA);
        } else if (filter === "Most helpful") {
            elementA = a.likes;
            elementB = b.likes;
        }

        let comparison = 0;
        if (elementA > elementB) {
            comparison = 1;
        } else if (elementA < elementB) {
            comparison = -1;
        }
        if (filter === "Oldest") {
            return comparison;
        }
        return comparison * -1;
    }

    return (
        <VStack spacing={6} alignItems="stretch">
            <HStack>
                <Box fontWeight="bold" fontSize="lg">
                    Reviews
                </Box>
                <ReviewFilterMenu
                    w="max-content"
                    variant="ghost"
                    title={`Most helpful ...`}
                    updateFunction={updateFunction}
                    filterOption={filter}
                />
            </HStack>
            {reviews
                .slice(0)
                .sort(compare)
                .map((review: any, index: number) => (
                    <Review
                        key={index}
                        username={review.fromUser.user.username}
                        date={review.published_at.toLocaleString().split("T")[0]}
                        title={review.title}
                        description={review.description}
                        score={review.score}
                        likes={review.likes}
                    />
                ))}
        </VStack>
    );
});

export default Reviews;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */
type Params = { username: string };

export const getStaticProps: GetStaticProps<ReviewProps, Params> = async (context) => {
    // Null guard
    if (context.params == undefined) {
        return { notFound: true };
    }

    // Query data specially for this route
    const { username } = context.params;
    const client = initializeApollo();
    await client.query({ query, variables: { username } });

    // Get return props from layout data fetching method and extract cache from layout props if any
    const result = (await Reviews.retrievePropsFromLayoutDataRequirement(context)) ?? {};
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
