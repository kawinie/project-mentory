import { ComponentPropsWithRef, forwardRef } from "react";
import tw from "twin.macro";

type TInputFieldProps = ComponentPropsWithRef<"input"> & {
    name: string;
    label: string;
    helperText?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
};

export const InputField = forwardRef<HTMLInputElement, TInputFieldProps>(
    ({ label, name, helperText, ...props }, ref) => (
        <label htmlFor={name} css={[tw`grid gap-1`]}>
            <span tw="text-sm">{label}</span>
            <input tw="form-input w-full" name={name} ref={ref} {...props} />
            {helperText && (
                <span tw="flex justify-start text-xs text-gray-500">Ex: {helperText}</span>
            )}
        </label>
    )
);

InputField.displayName = "InputField";
