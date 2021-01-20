import Link from "next/link";
import Head from "next/head";
import "twin.macro";
import { useForm } from "react-hook-form";
import { UserPlus } from "phosphor-react";
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

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";

const data = [
    { name: "Google", Icon: Image, source: "/images/google.png" },
    { name: "Facebook", Icon: Image, source: "/images/facebook.png" },
    { name: "Twitter", Icon: Image, source: "/images/twitter.png" },
    { name: "LinkedIn", Icon: Image, source: "/images/linkedin.png" },
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
                {data.map(({ name, Icon, source }) => (
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

const ManualFormSignUp = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const onSubmit = (userData: any) => {
        console.log(userData);
    };

    return (
        <form tw="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField
                name="email"
                label="Email address"
                helperText="foobar@abc.com"
                ref={register}
                required
            />
            <InputField
                name="username"
                label="Username"
                helperText="johndoe123"
                ref={register}
                required
            />
            <InputField
                name="password"
                label="Password"
                type="password"
                ref={register({ minLength: 8 })}
                required
            />
            {errors.password && (
                <span tw="flex justify-start text-xs text-gray-500">
                    Password must be at least 8 chracters long
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
