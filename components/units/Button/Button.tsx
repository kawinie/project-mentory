import { Box, Button as CKButton, ButtonProps, propNames } from "@chakra-ui/react";
import { ComponentPropsWithoutRef, forwardRef, ReactElement, ReactNode } from "react";
import tw from "twin.macro";

export type TButtonProps = ComponentPropsWithoutRef<"button"> & {
    icon?: ReactElement;
    iconRight?: boolean;
    text?: string;
};

const TextContainer = tw.span`flex-grow text-center whitespace-nowrap`;

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
    ({ icon, iconRight, text, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                tw="flex items-center justify-center p-3 text-sm text-white transition duration-200 transform bg-gray-700 rounded shadow hover:(-translate-y-1 shadow-xl)"
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

// export const Button = ({ children, ...props }: ButtonProps) => {
//     return (
//         <CKButton display="flex" {...props}>
//             <Box flexGrow={1}>{children}</Box>
//         </CKButton>
//     );
// };
