import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import "twin.macro";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TwitterLogo, FacebookLogo, LinkedinLogo, SignIn } from "phosphor-react";
import {
    Box,
    Button,
    ButtonProps,
    Container,
    Grid,
    HStack,
    Image,
    Text,
    Heading,
    Divider,
    IconButton,
    VStack,
} from "@chakra-ui/react";

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";
import { setCurrentUser } from "redux/actions";

import { login } from "../lib/auth";

const data = [
    { name: "Google", source: "/svg/google.svg" },
    { name: "Facebook", source: "/svg/facebook.svg" },
    { name: "Twitter", source: "/svg/twitter.svg" },
    { name: "LinkedIn", source: "/svg/linkedin.svg" },
] as const;

const SocialSignIn = () => {
    const { min, max } = useScreen();

    const buttonProps: ButtonProps = {
        w: "full",
        size: "lg",
        fontSize: "sm",
    } as const;

    return (
        <VStack justify="start" spacing={8}>
            <Grid tw="w-full gap-4" autoFlow={["column", "row"]} as="ul">
                {data.map(({ name, source }) => (
                    <li key={name}>
                        {max`sm` && (
                            <IconButton
                                {...buttonProps}
                                aria-label={name}
                                icon={
                                    <Image src={source} style={{ height: "35px", width: "auto" }} />
                                }
                            />
                        )}
                        {min`sm` && (
                            <Button {...buttonProps} aria-label={name} display="block">
                                <HStack spacing={6}>
                                    <Image
                                        src={source}
                                        style={{ height: "35px", marginLeft: "15%" }}
                                    />
                                    <Text>Sign In with {name}</Text>
                                </HStack>
                            </Button>
                        )}
                    </li>
                ))}
            </Grid>
        </VStack>
    );
};

type FormData = {
    username: string;
    password: string;
    term: boolean;
};

const MaunalFormSignIn = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit(async ({ username, password }) => {
        try {
            await login(username, password);
            typeof window !== "undefined" ? localStorage.setItem("username", username) : null;
            const referal = router.query.referal as string | undefined;
            router.push(referal ?? "/landing");
        } catch (error) {
            console.log(error);
            alert("Invalid email or password");
        }
    });

    return (
        <form tw="grid gap-8" onSubmit={onSubmit}>
            <InputField
                name="username"
                label="Username"
                helperText="johndoe123"
                ref={register}
                required
            />
            <InputField name="password" label="Password" type="password" ref={register} required />
            <Button
                w="full"
                fontSize="sm"
                size="lg"
                type="submit"
                colorScheme="purple"
                leftIcon={<SignIn size={24} />}>
                Sign In
            </Button>
            <Text fontSize="sm" justifySelf="right">
                Don‘t have an account?{" "}
                <Link href="/signup">
                    <a>register</a>
                </Link>
            </Text>
        </form>
    );
};

export default function Login() {
    return (
        <Box
            backgroundImage="url('/images/back.png')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundAttachment="fixed">
            <Container tw="grid place-items-center h-screen max-w-screen-md">
                <Head>
                    <title>Login – Mentory</title>
                </Head>
                <Grid w="100%" gap={[8, 12]} templateColumns={[null, "1fr auto 1fr"]}>
                    <VStack tw="col-span-full" spacing={4} align="center">
                        <Heading fontSize="5xl">Sign In</Heading>
                        <Text fontSize="sm" color="gray.500">
                            With one of your connected social media account below or with your email
                            and password.
                        </Text>
                    </VStack>
                    <SocialSignIn />
                    <Divider orientation="vertical" />
                    <MaunalFormSignIn />
                </Grid>
            </Container>
        </Box>
    );
}
