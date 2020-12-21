import { ComponentPropsWithoutRef, forwardRef, ReactElement } from "react";
import tw from "twin.macro";

export type TButtonProps = ComponentPropsWithoutRef<"button"> & {
    icon?: ReactElement;
    iconRight?: boolean;
    text?: string;
};

const TextContainer = tw.div`flex-grow text-center whitespace-nowrap`;
export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
    ({ icon, iconRight, text, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                css={[
                    tw`flex items-center justify-center p-3 text-sm text-white transition duration-200 transform bg-gray-700 rounded shadow hover:(-translate-y-1 shadow-xl)`,
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
    }
);

Button.displayName = "Button";
