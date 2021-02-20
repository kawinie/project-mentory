import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import "twin.macro";
import { useForm } from "react-hook-form";
import { UserPlus } from "phosphor-react";
import { useDispatch } from "react-redux";
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
    HStack,
    Image,
    Box,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";

import { createSession } from "../redux/actions";
import { registerUser } from "../lib/auth";

const data = [
    { name: "Google", source: "/svg/google.svg" },
    { name: "Facebook", source: "/svg/facebook.svg" },
    { name: "Twitter", source: "/svg/twitter.svg" },
    { name: "LinkedIn", source: "/svg/linkedin.svg" },
] as const;

const SocialSignUp = () => {
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
                            <Button {...buttonProps} aria-label={name}>
                                <HStack justify="start" spacing={8}>
                                    <Image src={source} style={{ height: "35px", width: "auto" }} />
                                    <Text>Sign Up with {name}</Text>
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
    email: string;
    username: string;
    password: string;
    term: boolean;
};

const schema = z.object({
    email: z
        .string()
        .nonempty({ message: "Required" })
        .email({ message: "This has to be an email address" }),
    username: z.string().nonempty({ message: "Required" }),
    password: z
        .string()
        .nonempty({ message: "Required" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
            message:
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }),
});

const ManualFormSignUp = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (userData: FormData) => {
        await registerUser(userData.username, userData.email, userData.password);
        dispatch(createSession(userData.username));
        router.push("/landing");
    };

    return (
        <form tw="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField
                name="email"
                label="Email address"
                helperText="foobar@abc.com"
                ref={register}
            />
            {errors.email?.message && (
                <span tw="flex justify-start text-xs text-purple-500">{errors.email?.message}</span>
            )}
            <InputField name="username" label="Username" helperText="johndoe123" ref={register} />
            {errors.username?.message && (
                <span tw="flex justify-start text-xs text-purple-500">
                    {errors.username?.message}
                </span>
            )}
            <InputField
                name="password"
                label="Password"
                type="password"
                ref={register({ minLength: 8 })}
            />
            {errors.password && (
                <span tw="flex justify-start text-xs text-purple-500">
                    {errors.password?.message}
                </span>
            )}
            <label tw="inline-grid gap-2 grid-flow-col justify-start items-center text-sm">
                <input type="checkbox" name="term" tw="form-checkbox" ref={register} required />I
                agree to the{" "}
                <a href="" onClick={() => alert("Add link!!")}>
                    privacy policy
                </a>
            </label>
            <Button
                w="full"
                fontSize="sm"
                size="lg"
                type="submit"
                colorScheme="purple"
                // variant="outline"
                leftIcon={<UserPlus size={24} />}>
                Sign Up
            </Button>
            <Text fontSize="sm" justifySelf="right">
                Do you have an account?{" "}
                <Link href="/login">
                    <a>login</a>
                </Link>
            </Text>
        </form>
    );
};

export default function Signup() {
    return (
        <Box
            backgroundImage="url('/images/back.png')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundAttachment="fixed">
            <Container tw="grid place-items-center h-screen max-w-screen-md">
                <Head>
                    <title>Signup - Mentory</title>
                </Head>
                <Grid w="100%" gap={[8, 12]} templateColumns={[null, "1fr auto 1fr"]}>
                    <VStack tw="col-span-full" spacing={4} align="center">
                        <Heading fontSize="5xl">Welcome to Mentory!</Heading>
                        <Text maxw="sm" fontSize="sm" color="gray.500">
                            With one of your connected social media account below or with your email
                            and password.
                        </Text>
                    </VStack>
                    <SocialSignUp />
                    <Divider orientation="vertical" />
                    <ManualFormSignUp />
                </Grid>
            </Container>
        </Box>
    );
}
