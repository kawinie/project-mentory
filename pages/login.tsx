import Link from "next/link";
import Head from "next/head";
import tw, { theme, styled } from "twin.macro";
import { useForm } from "react-hook-form";

import { ImFacebook, ImGoogle, ImLinkedin } from "react-icons/im";
import { FaSignInAlt } from "react-icons/fa";

import {
    Avatar,
    Box,
    ScaleFade,
    useDisclosure,
    Text,
    Flex,
    Spacer,
    ButtonProps,
} from "@chakra-ui/react";

import { useMinScreen } from "hooks";

import { InputField } from "components/units/InputField";
import { Button } from "components/units";
const SocialSignIn = () => {
    const { min } = useMinScreen();
    const { isOpen, onToggle } = useDisclosure();

    return (
        <div tw="grid items-start gap-8">
            <ul tw="grid w-full grid-flow-col gap-4 mobile-ls:(grid-flow-row)">
                {([
                    { name: "Facebook", Icon: ImFacebook, color: "facebook" },
                    { name: "Google", Icon: ImGoogle, color: "google-plus" },
                    { name: "LinkedIn", Icon: ImLinkedin, color: "linkedin" },
                ] as const).map(({ name, color, Icon }) => (
                    <li key={name}>
                        <Button
                            tw="w-full"
                            icon={<Icon size={20} />}
                            text={min`mobile` ? `Sign in with ${name}` : undefined}></Button>
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
                <Button tw="bg-red-500" type="submit" icon={<FaSignInAlt />}>
                    Sign In
                </Button>
                <div tw="text-sm">
                    Don‘t have an account?{" "}
                    <Link href="/signup" passHref>
                        <a tw="text-teal-500 underline">Click here to register</a>
                    </Link>
                </div>
            </div>
        </form>
    );
};

const GridContainer = styled.div`
    ${tw`grid max-w-screen-laptop gap-8 p-4 mx-auto place-content-center`};
    @media (min-width: ${theme`screens.mobile` as string}) {
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
