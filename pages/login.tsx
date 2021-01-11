import Link from "next/link";
import Head from "next/head";
import tw, { theme, styled } from "twin.macro";
import { useForm } from "react-hook-form";
import { TwitterLogo, FacebookLogo, LinkedinLogo, SignIn } from "phosphor-react";
import { Button, ButtonProps } from "@chakra-ui/react";

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";

const SignInButton = ({ children, ...props }: ButtonProps) => {
    return (
        <Button w="full" size="lg" fontSize="sm" {...props}>
            {children}
        </Button>
    );
};

const SocialSignIn = () => {
    const { min } = useScreen();
    return (
        <div tw="grid items-start gap-8">
            <ul tw="grid w-full grid-flow-col gap-4 mobile-ls:(grid-flow-row)">
                {([
                    { name: "Facebook", Icon: FacebookLogo, color: "facebook" },
                    { name: "Twitter", Icon: TwitterLogo, color: "twitter" },
                    { name: "LinkedIn", Icon: LinkedinLogo, color: "linkedin" },
                ] as const).map(({ name, color, Icon }) => (
                    <li key={name}>
                        <SignInButton leftIcon={<Icon size={24} weight="fill" />}>
                            {min`mobile-ls` ? `Sign in with ${name}` : null}
                        </SignInButton>
                    </li>
                ))}
            </ul>
        </div>
    );
};

type FormData = {
    username: string;
    password: string;
    term: boolean;
};

const MaunalFormSignIn = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data, null, 4) + "\n DON'T forget to send this to API!");
    });

    return (
        <form tw="grid max-w-sm gap-8" onSubmit={onSubmit}>
            <InputField
                name="username"
                label="Username"
                helperText="johndoe123"
                ref={register}
                required
            />
            <InputField name="password" label="Password" type="password" ref={register} required />
            <label htmlFor="term" tw="flex items-center">
                <input type="checkbox" name="term" tw="form-checkbox" ref={register} required />
                <span tw="ml-2 text-sm">
                    I agree to the{" "}
                    <a href="" tw="text-teal-500 underline" onClick={() => alert("Add link!!")}>
                        privacy policy
                    </a>
                </span>
            </label>
            <div tw="grid gap-8">
                <SignInButton fontSize="sm" size="lg" type="submit" leftIcon={<SignIn size={24} />}>
                    Sign In
                </SignInButton>
                <div tw="text-sm">
                    Don‘t have an account?{" "}
                    <Link href="/signup" passHref>
                        <a tw="text-purple-500 underline">Click here to register</a>
                    </Link>
                </div>
            </div>
        </form>
    );
};

const GridContainer = styled.div`
    ${tw`grid max-w-screen-laptop gap-8 p-4 mx-auto place-content-center`};
    @media (min-width: ${theme`screens.mobile-ls` as string}) {
        ${tw`gap-12`}
        grid-template-columns: 1fr auto 1fr;
    }
`;

const Heading = tw.h1`pb-4 text-5xl`;
const PageContainer = tw.div`flex items-center justify-center h-screen`;

export default function Login() {
    return (
        <PageContainer>
            <Head>
                <title>Login – Mentory</title>
            </Head>
            <GridContainer>
                <div tw="col-span-full">
                    <Heading>Sign In</Heading>
                    <div tw="max-w-sm text-sm text-gray-500">
                        With one of your connected social media account below or with your email and
                        password.
                    </div>
                </div>
                <SocialSignIn />
                <div tw="border-b mobile-ls:(border-l)" />
                <MaunalFormSignIn />
            </GridContainer>
        </PageContainer>
    );
}
