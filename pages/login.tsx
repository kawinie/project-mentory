import tw, { theme, styled } from "twin.macro";

import { ImFacebook, ImGoogle, ImLinkedin } from "react-icons/Im";
import { Button } from "components/units/Button";

import Link from "next/link";

const PageContainer = tw.div`flex items-center justify-center h-screen`;

type TInputFieldProps = {
    name: string;
    label: string;
    helperText?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
};

const InputField = ({ label, name, helperText, ...props }: TInputFieldProps) => (
    <label htmlFor={name} css={[tw`grid gap-1`]}>
        <span css={[tw`text-sm`]}>{label}</span>
        <input tw="w-full form-input" name={name} {...props} />
        {helperText && <span tw="text-xs text-gray-500 justify-start flex">Ex: {helperText}</span>}
    </label>
);

const SocialIcons = () => (
    <ul tw="grid gap-4 grid-flow-col sm:grid-flow-row justify-center">
        {[
            { name: "Facebook", Icon: ImFacebook, color: "#3b5998" },
            { name: "Google", Icon: ImGoogle, color: "#DC4B3C" },
            { name: "LinkedIn", Icon: ImLinkedin, color: "#0e76a8" },
        ].map(({ name, color, Icon }) => (
            <li key={name}>
                <Button
                    tw="p-3 w-full"
                    icon={<Icon size="20px" />}
                    text={`Sign in with ${name}`}
                    css={{ backgroundColor: color }}
                />
            </li>
        ))}
    </ul>
);

const SocialSection = () => (
    <div tw="grid gap-8 content-center justify-center self-start">
        <SocialIcons />
    </div>
);

const ManualSection = () => (
    <form tw="grid gap-8 max-w-sm">
        <InputField name="email" label="Email" helperText="jane.doe@domain.com" required />
        <InputField name="password" label="Password" type="password" required />
        <label htmlFor="term" tw="flex items-center">
            <input type="checkbox" name="term" tw="form-checkbox" required />
            <span tw="ml-2 text-sm">
                I agree to the{" "}
                <a href="" tw="underline text-teal-500">
                    privacy policy
                </a>
            </span>
        </label>
        <div tw="grid gap-8">
            <Button tw="bg-teal-500" text="Sign In" type="submit" />
            <div tw="text-sm">
                Don‘t have an account?{" "}
                <Link href="/signup" passHref>
                    <a tw="text-teal-500 underline">Click here to register</a>
                </Link>
            </div>
        </div>
    </form>
);

const GridContainer = styled.div`
    ${tw`grid max-w-screen-lg gap-8 p-4 mx-auto place-content-center`};
    @media (min-width: ${theme`screens.sm`!}) {
        ${tw`gap-12`}
        grid-template-columns: 1fr auto 1fr;
    }
`;

export default function Login() {
    return (
        <PageContainer>
            <GridContainer>
                <div tw="col-span-full border-b pb-4">
                    <div tw="text-5xl pb-4">Sign In</div>
                    <div tw="text-sm text-gray-500 max-w-sm">
                        With one of your connected social media account below <br /> or with your
                        email and password.
                    </div>
                </div>
                <SocialSection />
                <div tw="border-b sm:(border-l)"></div>
                <ManualSection />
            </GridContainer>
        </PageContainer>
    );
}
