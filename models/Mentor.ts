export type Mentor = {
    firstname: string;
    lastname: string;
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
};
