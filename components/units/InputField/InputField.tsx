import tw from "twin.macro";

type TInputFieldProps = {
    name: string;
    label: string;
    helperText?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
};

export const InputField = ({ label, name, helperText, ...props }: TInputFieldProps) => (
    <label htmlFor={name} css={[tw`grid gap-1`]}>
        <span tw="text-sm">{label}</span>
        <input tw="w-full form-input" name={name} {...props} />
        {helperText && <span tw="text-xs text-gray-500 justify-start flex">Ex: {helperText}</span>}
    </label>
);
