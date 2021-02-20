import "twin.macro";

export type MentorCardProps = {
    fullname: string;
    badge: string;

    location: string;
    expInYears: number;
    status?: string;

    tags: string[];
    avgReviewScore: number;
    noReviews: number;
    noEndorsements: number;

    profileImg?: string;
    profileUrl?: string;

    brief: string;

    variant: "mobile" | "desktop";
};
