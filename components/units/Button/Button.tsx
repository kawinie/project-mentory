import { ComponentPropsWithoutRef } from "react";
import tw from "twin.macro";

export type TButtonProps = ComponentPropsWithoutRef<"button"> & {
    icon?: JSX.Element;
    iconRight?: boolean;
    text?: string;
};

const TextContainer = tw.div`flex-grow hidden text-center whitespace-nowrap sm:block`;

export const Button: React.FC<TButtonProps> = ({ icon, iconRight, text, ...props }) => {
    return (
        <button
            type="button"
            css={[
                tw`flex items-center p-2 text-sm text-white bg-gray-700 rounded shadow transform transition duration-200 hover:(-translate-y-1 shadow-xl)`,
            ]}
            {...props}>
            {icon && !iconRight && (
                <span css={text && tw`mr-2`} className="icon">
                    {icon}
                </span>
            )}
            {text && <TextContainer>{text}</TextContainer>}
            {icon && iconRight && (
                <span css={text && tw`ml-2`} className="icon">
                    {icon}
                </span>
            )}
        </button>
    );
};
