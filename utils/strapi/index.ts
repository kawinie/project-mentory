import { ImageLoader } from "next/image";

export const strapiImgLoader: ImageLoader = ({ src, width, quality }) => {
    if (!src || src == "") {
        return "/images/trollface.jpg";
    }

    const regex = /\/(.*)/g;
    const withoutForwardSlash = src.replace(regex, "$1");
    const domain = process.env.NEXT_PUBLIC_API_URL;

    if (typeof window == "undefined") {
        require("assert").notEqual(domain, null);
    }

    return `${domain}/${withoutForwardSlash}?w=${width}&q=${quality || 75}`;
};
