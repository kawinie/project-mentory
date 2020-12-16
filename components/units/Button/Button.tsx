import tw from "twin.macro";

type TButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    icon?: () => JSX.Element;
    iconPosition?: "left" | "right";
    text?: string;
};

export const Button = ({ icon, iconPosition = "left", text, ...props }: TButtonProps) => {
    return (
        <button
            css={[
                tw`flex items-center p-4 text-sm text-white bg-gray-700 rounded shadow transform transition duration-200 hover:(-translate-y-1 shadow-xl)`,
                !text && tw`justify-center`,
            ]}
            type="button"
            {...props}>
            {icon && iconPosition == "left" && <span tw="mr-2">{icon()}</span>}
            {text && <div tw="text-center flex-grow whitespace-nowrap">{text}</div>}
            {icon && iconPosition == "right" && <span tw="ml-2">{icon()}</span>}
        </button>
    );
};
