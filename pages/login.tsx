import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import "twin.macro";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TwitterLogo, FacebookLogo, LinkedinLogo, SignIn } from "phosphor-react";
import {
    Button,
    ButtonProps,
    Container,
    Grid,
    Text,
    Heading,
    Divider,
    IconButton,
    VStack,
} from "@chakra-ui/react";

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";

import { createSession } from "../redux/actions";
import { login } from "../lib/auth";

const data = [
    { name: "Facebook", Icon: FacebookLogo, color: "facebook" },
    { name: "Twitter", Icon: TwitterLogo, color: "twitter" },
    { name: "LinkedIn", Icon: LinkedinLogo, color: "linkedin" },
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
                {data.map(({ name, Icon }) => (
                    <li key={name}>
                        {max`sm` && (
                            <IconButton
                                {...buttonProps}
                                aria-label={name}
                                icon={<Icon size={28} weight="fill" />}
                            />
                        )}
                        {min`sm` && (
                            <Button {...buttonProps} leftIcon={<Icon size={28} />}>
                                Sign In with {name}
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
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit((data) => {
        login(data.username, data.password)
            .then(() => {
                dispatch(createSession(data.username));
                router.push("/landing");
            })
            .catch((err) => {
                router.reload();
                console.log(err);
                alert("Invalid email or password");
            });
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
            <label tw="inline-grid gap-2 grid-flow-col justify-start items-center text-sm">
                <input type="checkbox" name="term" tw="form-checkbox" ref={register} required />I
                agree to the{" "}
                <a href="" onClick={() => alert("Add link!!")}>
                    privacy policy
                </a>
            </label>
            <Button w="full" fontSize="sm" size="lg" type="submit" leftIcon={<SignIn size={24} />}>
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
        <Container tw="grid place-items-center h-screen max-w-screen-md">
            <Head>
                <title>Login – Mentory</title>
            </Head>
            <Grid w="100%" gap={[8, 12]} templateColumns={[null, "1fr auto 1fr"]}>
                <VStack tw="col-span-full" spacing={4} align="start">
                    <Heading fontSize="5xl">Sign In</Heading>
                    <Text maxW="sm" fontSize="sm" color="gray.500">
                        With one of your connected social media account below or with your email and
                        password.
                    </Text>
                </VStack>
                <SocialSignIn />
                <Divider orientation="vertical" />
                <MaunalFormSignIn />
            </Grid>
        </Container>
    );
}
