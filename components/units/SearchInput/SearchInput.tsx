import { ComponentPropsWithRef, forwardRef } from "react";
import tw from "twin.macro";

type TInputFieldProps = ComponentPropsWithRef<"input"> & {
    placeholder?: string;
};

export const SearchInput = forwardRef<HTMLInputElement, TInputFieldProps>(
    ({ name, ...props }, ref) => {
        return <input tw="w-80 h-full form-input" ref={ref} type="search" />;
    }
);

SearchInput.displayName = "SearchInput";
