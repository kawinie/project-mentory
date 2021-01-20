import Head from "next/head";
import "twin.macro";
import {
    Container,
    Heading,
    Grid,
    IconButton,
    ButtonProps,
    Divider,
    Text,
    Button,
    Link,
    Image,
} from "@chakra-ui/react";
import { TwitterLogo, FacebookLogo, LinkedinLogo, SignIn } from "phosphor-react";
import { useForm } from "react-hook-form";

import { useScreen } from "hooks";
import { InputField } from "components/units/InputField";

const socialMediaData = [
    { name: "Facebook", Icon: FacebookLogo, color: "facebook" },
    { name: "Twitter", Icon: TwitterLogo, color: "twitter" },
    { name: "LinkedIn", Icon: LinkedinLogo, color: "linkedin" },
] as const;

const SocialSignUp = () => {
    const buttonProps: ButtonProps = {
        w: "full",
        size: "lg",
        fontSize: "sm",
    } as const;

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} as="ul">
            {socialMediaData.map(({ name, Icon, color }) => (
                <li key={name}>
                    <IconButton
                        {...buttonProps}
                        aria-label={name}
                        icon={<Icon size={35} weight="fill" />}
                        colorScheme={color}
                        isRound={true}
                    />
                </li>
            ))}
        </Grid>
    );
};

const ManualFormSignUp = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data, null, 4) + "\n DON'T forget to send this to API!");
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
            <InputField
                name="email"
                label="Email"
                helperText="johndoe123@gmail.com"
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
                Create Account
            </Button>
            <Text fontSize="sm" justifySelf="right">
                Already have an account?{" "}
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Text>
        </form>
    );
};

export default function Signup() {
    const { min, max } = useScreen();
    return (
        <div>
            {max`sm` && (
                <Container tw="grid place-items-center h-screen max-w-screen-md">
                    <Head>
                        <title>Sign Up – Mentory</title>
                    </Head>
                    <Heading>Create an Account</Heading>
                    <SocialSignUp />
                    <Text>OR</Text>
                    <Divider orientation="horizontal" />
                    <ManualFormSignUp />
                </Container>
            )}
            {min`sm` && (
                <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                    <Image
                        tw="h-full"
                        src="https://cdn.sanity.io/images/0vv8moc6/neurolive/888fc79ce09841ce925491db217304f536a9bd5d-1200x1200.jpg?auto=format"
                        objectFit="fill"
                        alt="Mentory"
                    />
                    <Container tw="grid place-items-center h-screen max-w-screen-md">
                        <Head>
                            <title>Sign Up – Mentory</title>
                        </Head>
                        <Heading>Create an Account</Heading>
                        <SocialSignUp />
                        <Text>OR</Text>
                        <Divider orientation="horizontal" />
                        <ManualFormSignUp />
                    </Container>
                </Grid>
            )}
        </div>
    );
}
