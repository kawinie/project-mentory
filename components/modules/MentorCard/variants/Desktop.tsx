import "twin.macro";
import { Grid, GridProps } from "@chakra-ui/react";

import { pick } from "utils";

import { LikeButton } from "../components";

import { MentorCardProps, ProfileSection, TagSection, MainSection, StatSection } from "./Base";

/* -------------------------------------------------------------------------- */
/*                                   Desktop                                  */
/* -------------------------------------------------------------------------- */

export function Desktop({ profileImg, tags, ...props }: MentorCardProps) {
    const grid_layout: GridProps = {
        templateAreas: `
            "profile tags tags"
            "profile main view"
        `,
        templateColumns: "120px minmax(0, 1fr) max-content",
        templateRows: "max-content 1fr",
        rowGap: 4,
        columnGap: 8,
    };

    const grid_styles: GridProps = {
        p: 8,
        border: "1px",
        borderColor: "coolGray.200",
        bg: "white",
        rounded: "md",
        shadow: "lg",
    };

    // const main = pick(props, "fullname", "location", "badge", "expInYears", "status", "brief");
    // const stat = pick(props, "avgReviewScore", "noReviews", "noEndorsements");

    const main = pick(props, "fullname", "location", "badge", "expInYears", "status", "brief");
    const stat = pick(props, "avgReviewScore", "noReviews", "noEndorsements");

    return (
        <Grid {...grid_layout} {...grid_styles} maxW="800px" position="relative" overflow="hidden">
            <LikeButton top={0} right={0} isLiked={false} />
            <ProfileSection gridArea="profile" img={profileImg} />
            <TagSection gridArea="tags" tags={tags} />
            <MainSection gridArea="main" {...main} />
            <StatSection gridArea="view" direction="column" {...stat} />
        </Grid>
    );
}
