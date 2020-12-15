import { AnchorHTMLAttributes, FC, HTMLProps } from "react";
import { useSelector } from "react-redux";

type Props = {
    title?: string;
};

export const UnitExample: FC<Props & HTMLProps<HTMLDivElement>> = ({ title = "UNTITLED" }) => {
    return <div className="text-gray-500 bg-teal-500 border">{title}</div>;
};
