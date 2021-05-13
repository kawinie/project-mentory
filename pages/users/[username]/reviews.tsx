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
import { useState } from "react";
import { GetStaticProps } from "next";

import { withLayout } from "utils/layout";
import { initializeApollo } from "utils/apollo";
import { Review } from "components/modules/Review";

import query from "./gql/reviews.gql";

import { UserPageLayout } from ".";

type ReviewProps = {
    username: string;
    reviews: any[];
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

const Reviews = withLayout(UserPageLayout, function ({ reviews }: ReviewProps) {
    const [filter, setFilter] = useState("Most recent");

    function updateFunction(chosenFilter: string) {
        setFilter(chosenFilter);
    }

    function compare(a: any, b: any) {
        let elementA;
        let elementB;
        if (filter === "Most recent" || filter === "Oldest") {
            elementA = a.published_at.toUpperCase();
            elementB = b.published_at.toUpperCase();
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
                .map((review, index: number) => (
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
    if (context.params == undefined) {
        return { notFound: true };
    }

    const client = initializeApollo();
    const variables = { username: context.params.username };
    const { data, error } = await client.query({ query, variables });

    if (error || data.reviews == null) {
        return { notFound: true };
    }

    const layoutProps = await Reviews.retrievePropsFromLayoutDataRequirement(context);

    return {
        props: {
            ...data,
            layoutProps,
        },
    };
};

// Use the same static paths as main layout
export { getStaticPaths } from "./index";
