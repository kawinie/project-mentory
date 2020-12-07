// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

export default (_req: NextApiRequest, res: NextApiResponse): void => {
    res.statusCode = 200;
    res.json({ message: "Welcome to Mentory" });
};
