import Head from "next/head";
import "twin.macro";
import { useForm } from "react-hook-form";
import { TwitterLogo, FacebookLogo, LinkedinLogo, UserPlus } from "phosphor-react";
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
        <VStack>
            <Grid tw="w-full gap-8" autoFlow={["column", "row"]} as="ul">
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
                                Sign Up with {name}
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
                leftIcon={<UserPlus size={24} />}>
                Sign Up
            </Button>
        </form>
    );
};

export default function Signup() {
    return (
        <Container tw="grid place-items-center h-screen max-w-screen-md">
            <Head>
                <title>Signup - Mentory</title>
            </Head>
            <Grid w="100%" gap={[8, 12]} templateColumns="1fr auto 1fr">
                <VStack tw="col-span-full" spacing={4} align="start">
                    <Heading>Sign Up</Heading>
                    <Text maxw="sm" fontSize="sm" color="gray.500">
                        With one of your connected social media account below or with your email and
                        password.
                    </Text>
                </VStack>
                <SocialSignUp />
                <Divider orientation="vertical" />
                <ManualFormSignUp />
            </Grid>
        </Container>
    );
}
