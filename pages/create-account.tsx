import tw from "twin.macro";

import { ImFacebook, ImGoogle, ImLinkedin } from "react-icons/Im";
import { Button } from "components/units/Button";

const PageContainer = tw.div`flex items-center justify-center h-screen`;
const SubmitButton = tw.input`form-input mt-4 bg-teal-500 text-white shadow transform transition duration-200 hover:(-translate-y-1 shadow-xl cursor-pointer)`;

type TTextField = {
    name: string;
    label: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
};

const TextField = ({ name, label, placeholder, helperText, required }: TTextField) => (
    <label htmlFor={name} tw="grid gap-1">
        <span tw="text-sm">{label}</span>
        <input tw="w-full form-input" name={name} placeholder={placeholder} required={required} />
        {helperText && <span tw="text-xs text-gray-500 justify-start flex">Ex: {helperText}</span>}
    </label>
);

const SocialIcons = () => (
    <ul tw="grid gap-4 auto-cols-fr justify-center">
        {[
            { name: "Facebook", Icon: ImFacebook, color: "#3b5998" },
            { name: "Google", Icon: ImGoogle, color: "#DC4B3C" },
            { name: "LinkedIn", Icon: ImLinkedin, color: "#0e76a8" },
        ].map(({ name, color, Icon }) => (
            <li key={name} tw="w-full flex justify-center">
                <Button
                    icon={() => <Icon size="1.5rem" />}
                    text={`Sign up with ${name}`}
                    css={{ backgroundColor: color, width: "16rem" }}
                />
            </li>
        ))}
    </ul>
);

const SignUpTypeSeparator = () => (
    <div tw="flex w-full items-center justify-self-stretch">
        <hr tw="flex-grow" />
        <div tw="px-4 text-xl text-gray-500">OR</div>
        <hr tw="flex-grow" />
    </div>
);

const SocialSection = () => (
    <div tw="grid gap-8 content-center justify-center self-start">
        <SignUpTypeSeparator />
        <div tw="whitespace-nowrap">Sign up using your existing social media account</div>
        <SocialIcons />
    </div>
);

const ManualSection = () => (
    <form tw="grid gap-6 max-w-sm">
        <TextField name="firstname" label="First Name" helperText="Jane" required />
        <TextField name="lastname" label="Last Name" helperText="Doe" required />
        <TextField name="email" label="Email" helperText="jane.doe@domain.com" required />
        <label htmlFor="term" tw="flex items-center">
            <input type="checkbox" name="term" tw="form-checkbox" required />
            <span tw="ml-2 text-sm">
                I agree to the{" "}
                <a href="" tw="underline text-teal-500">
                    privacy policy
                </a>
            </span>
        </label>
        <Button tw="py-4 bg-teal-500 text-base" text="Create Account" type="submit" />
    </form>
);

export default function CreateAccount() {
    return (
        <PageContainer>
            <div
                tw="grid gap-8 place-content-center p-4 mx-auto max-w-screen-lg w-full"
                css={{ gridTemplate: "min-content 1fr / 1fr 1fr" }}>
                <div tw="text-3xl col-span-full">Create Account</div>
                <ManualSection />
                <SocialSection />
            </div>
        </PageContainer>
    );
}
