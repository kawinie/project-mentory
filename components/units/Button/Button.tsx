import { ComponentPropsWithRef, forwardRef } from "react";
import tw from "twin.macro";

export type TButtonProps = ComponentPropsWithRef<"button"> & {
    icon?: JSX.Element;
    iconRight?: boolean;
    text?: string;
};

const TextContainer = tw.div`flex-grow text-center whitespace-nowrap`;

export const Button = forwardRef<HTMLButtonElement, TButtonProps>((bigProps, ref) => {
    const { icon, iconRight, text, ...props } = bigProps;
    return (
        <button
            type="button"
            ref={ref}
            css={[
                tw`flex items-center justify-center p-3 text-sm text-white bg-gray-700 rounded shadow transform transition duration-200 hover:(-translate-y-1 shadow-xl)`,
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
});

Button.displayName = "Button";
