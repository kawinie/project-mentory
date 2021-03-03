import "twin.macro";
import { Grid, GridProps } from "@chakra-ui/react";

import { pick } from "utils";

import { ProfileSection, TagSection, MainSection, StatSection, MentorCardProps } from "./Base";

// TODO: Implement mobile layout when I have time
export function Mobile({ profileImg, tags, ...props }: MentorCardProps) {
    const grid_layout: GridProps = {
        templateAreas: `
            "profile tags tags"
            "profile main view"
        `,
        templateColumns: "120px 1fr max-content",
        templateRows: "max-content 1fr",
        gap: 4,
    };

    const grid_styles: GridProps = {
        p: 8,
        border: "1px",
        borderColor: "coolGray.200",
        bg: "white",
        rounded: "md",
    };

    const main = pick(props, "fullname", "location", "badge", "expInYears", "status", "brief");
    const stat = pick(props, "avgReviewScore", "noReviews", "noEndorsements");

    return (
        <Grid {...grid_layout} {...grid_styles} width={800}>
            <ProfileSection gridArea="profile" img={profileImg} />
            <TagSection gridArea="tags" tags={tags} />
            <MainSection gridArea="main" {...main} />
            <StatSection gridArea="view" direction="column" {...stat} />
        </Grid>
    );
}
