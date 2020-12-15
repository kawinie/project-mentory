import { ReactElement } from "react";
import tw from "twin.macro";

import Image from "next/image";

type TTextField = {
    name: string;
    label: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
};

const TextField = ({ name, label, placeholder, helperText, required }: TTextField) => (
    <label htmlFor={name} tw="block">
        <span>{label}</span>
        <input
            tw="w-full mt-1 form-input"
            name={name}
            placeholder={placeholder}
            required={required}
        />
        {helperText && (
            <span tw="text-sm text-gray-500 justify-start flex">Example: {helperText}</span>
        )}
    </label>
);

const PageContainer = tw.div`flex h-screen`;
const SubmitButton = tw.input`form-input mt-4 bg-teal-500 text-white shadow transform transition duration-200 hover:(-translate-y-1 shadow-xl cursor-pointer)`;

const SocialIcons = () => (
    <ul tw="mt-8 grid grid-flow-col w-full justify-items-center">
        {["facebook", "google", "linkedin"].map((name) => (
            <li key={name}>
                <Image src={`/svg/${name}.svg`} alt={`${name} icon`} width={32} height={32} />
            </li>
        ))}
    </ul>
);

export default function CreateAccount(): ReactElement {
    return (
        <PageContainer tw="max-w-screen-xl mx-auto py-16">
            <div tw="w-1/2 bg-gray-200">Cover Photo</div>
            <div tw="w-1/2 flex flex-col items-center justify-center">
                <div>
                    <span tw="tracking-wider text-3xl">Create Account</span>
                    <SocialIcons />
                </div>
                <div tw="flex w-full items-center px-16 mt-8">
                    <hr tw="flex-grow" />
                    <div tw="px-4 text-xl">OR</div>
                    <hr tw="flex-grow" />
                </div>
                <form tw="grid gap-4 mt-8">
                    <TextField name="firstname" label="First Name" helperText="Jane" required />
                    <TextField name="lastname" label="Last Name" helperText="Doe" required />
                    <TextField
                        name="email"
                        label="Email"
                        helperText="jane.doe@domain.com"
                        required
                    />
                    <label htmlFor="term" tw="flex items-center">
                        <input type="checkbox" name="term" tw="form-checkbox" required />
                        <span tw="ml-2">
                            I agree to the <span tw="underline">privacy policy</span>
                        </span>
                    </label>
                    <SubmitButton type="submit" value="Sign Up" />
                </form>
            </div>
        </PageContainer>
    );
}
