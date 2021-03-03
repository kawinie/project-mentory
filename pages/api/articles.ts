import { NextApiRequest, NextApiResponse } from "next";
import { times } from "lodash";

export default (_req: NextApiRequest, res: NextApiResponse): void => {
    const articles = times(4, () => ({
        title: "How to become a successful developer fast",
        author: "Rob Hess",
    }));

    res.statusCode = 200;
    res.json(articles);
};
