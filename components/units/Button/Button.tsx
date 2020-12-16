import "twin.macro";

type TButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    icon?: () => JSX.Element;
    iconPosition?: "left" | "right";
    text?: string;
};

export const Button = ({ icon, iconPosition = "left", text, ...props }: TButtonProps) => {
    return (
        <button
            tw="flex items-center p-4 rounded text-white text-sm w-full bg-gray-700"
            type="button"
            {...props}>
            {iconPosition == "left" && icon && <span tw="mr-2">{icon()}</span>}
            {text && <div tw="text-center flex-grow">{text}</div>}
            {iconPosition == "right" && icon && <span tw="ml-2">{icon()}</span>}
        </button>
    );
};
