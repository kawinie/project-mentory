import Head from "next/head";
import "twin.macro";
import {
    Container,
    Heading,
    Grid,
    IconButton,
    Button,
    ButtonProps,
    Divider,
    Text,
} from "@chakra-ui/react";
import { TwitterLogo, FacebookLogo, LinkedinLogo } from "phosphor-react";

import { useScreen } from "hooks";

const data = [
    { name: "Facebook", Icon: FacebookLogo, color: "facebook" },
    { name: "Twitter", Icon: TwitterLogo, color: "twitter" },
    { name: "LinkedIn", Icon: LinkedinLogo, color: "linkedin" },
] as const;

const SocialSignUp = () => {
    const { min, max } = useScreen();

    const buttonProps: ButtonProps = {
        w: "full",
        size: "lg",
        fontSize: "sm",
    } as const;

    return (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {data.map(({ name, Icon }) => (
                <li key={name}>
                    {max`sm` && (
                        <IconButton
                            {...buttonProps}
                            aria-label={name}
                            icon={<Icon size={40} weight="fill" />}
                        />
                    )}
                    {min`sm` && (
                        <Button {...buttonProps} leftIcon={<Icon size={40} weight="fill" />} />
                    )}
                </li>
            ))}
        </Grid>
    );
};

export default function Signup() {
    return (
        <Container tw="grid place-items-center h-screen max-w-screen-md">
            <Head>
                <title>Sign Up – Mentory</title>
            </Head>
            <Heading>Create an Account</Heading>
            <SocialSignUp />
            <Divider orientation="horizontal" />
            <Text>OR</Text>
        </Container>
    );
}
