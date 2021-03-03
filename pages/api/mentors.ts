import { NextApiRequest, NextApiResponse } from "next";
import { shuffle, times } from "lodash";

import { Mentor } from "models/Mentor";

export default (_req: NextApiRequest, res: NextApiResponse): void => {
    const avatarPaths = shuffle(times(16))
        .slice(0, 12)
        .map((i) => `/svg/avatar-${i}.svg`);

    const mentor: Mentor = {
        firstname: "Bjarne",
        lastname: "Stroustrup",
        profileImg: "/images/bjarne.jpg",
        badge: "Top Mentor",
        location: "New York, NY",
        expInYears: 40,
        status: "Too busy saving the world from evil coders",
        tags: [
            "software engineer",
            "c++ creator",
            "c++23",
            "c++20",
            "c++17",
            "c++14",
            "c++11",
            "c++98",
        ],
        avgReviewScore: 4.3,
        noEndorsements: 93,
        noReviews: 127,
        brief:
            "In 1979, Stroustrup began his career as a member of technical staff in the Computer Science Research Center of Bell Labs in Murray Hill, New Jersey, USA. There, he began his work on C++ and programming techniques",
    };

    const mentors = times<Mentor>(12, (i) => ({
        ...mentor,
        lastname: `${mentor.lastname} ${i}`,
        profileImg: avatarPaths[i],
    }));

    res.statusCode = 200;
    res.json(mentors);
};
