import "twin.macro";

export type MentorCardProps = {
    fullname: string;
    badge: string;

    location: string;
    expInYears: number;
    stories?: string;

    tags: string[];
    avgRating: number;
    noReviews: number;
    noEndorsements: number;

    profileImg?: string;
    profileUrl?: string;

    short: string;

    variant: "mobile" | "desktop";
};
