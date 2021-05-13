export type Mentor = {
    user: { username: string };
    firstname: string;
    lastname: string;
    badge: string;

    location: string;
    expInYears: number;
    status?: string;

    tags: { label: string; }[];
    avgReviewScore: number;
    noReviews: number;
    noEndorsements: number;

    profileImg?: { url: string; };
    profileUrl?: string;

    brief: string;
};
