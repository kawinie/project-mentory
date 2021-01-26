import Link from "next/link";
import "twin.macro";
import { useForm } from "react-hook-form";
import { TwitterLogo, FacebookLogo, LinkedinLogo, UserPlus } from "phosphor-react";
import {
    Box,
    Button,
    Flex,
    FormControl,
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
    { name: "Facebook", Icon: FacebookLogo, color: "#3b5998" },
    { name: "Twitter", Icon: TwitterLogo, color: "#00aced" },
    { name: "LinkedIn", Icon: LinkedinLogo, color: "#0077B5" },
] as const;

const SocialSignUp = () => {
    const { min, max } = useScreen();

    return (
        <VStack justify="start" mt={6}>
            <Grid tw="w-full gap-10" autoFlow={["column"]} as="ul" justifyContent="center">
                {data.map(({ name, Icon, color }) => (
                    <li key={name}>
                        {(max`sm` || min`sm`) && (
                            <IconButton
                                aria-label={name}
                                variant="link"
                                icon={
                                    <Icon
                                        tw="transform duration-300 transform hover:scale-125"
                                        size={38}
                                        weight="fill"
                                        color={color}
                                    />
                                }
                            />
                        )}
                    </li>
                ))}
            </Grid>
        </VStack>
    );
};

const ManualFormSignUp = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data, null, 4) + "\n DON'T forget to send this to API!");
    });

    return (
        <Box>
            <form tw="grid gap-8" onSubmit={onSubmit}>
                <FormControl>
                    <InputField
                        name="username"
                        label="Username"
                        helperText="johndoe123"
                        ref={register}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputField name="email" label="Email" ref={register} required />
                </FormControl>
                <FormControl>
                    <InputField
                        name="password"
                        label="Password"
                        type="password"
                        ref={register}
                        required
                    />
                </FormControl>
                <label tw="inline-grid gap-2 grid-flow-col justify-start items-center text-sm">
                    <input type="checkbox" name="term" tw="form-checkbox" ref={register} required />
                    I agree to the{" "}
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
                    Create Account
                </Button>
                <Text fontSize="sm" justifySelf="right" mb={8}>
                    Already have an account?{" "}
                    <Link href="/login">
                        <a>login</a>
                    </Link>
                </Text>
            </form>
        </Box>
    );
};

export default function Signup() {
    return (
        <Flex
            minHeight="100vh"
            width="full"
            align="center"
            justifyContent="center"
            backgroundImage="url('/images/background.png')"
            backgroundRepeat="no-repeat"
            backgroundPosition="center">
            <Box
                borderWidth={1}
                px={10}
                width="full"
                maxWidth="500px"
                borderRadius={8}
                boxShadow="lg"
                bg="white">
                <Box textAlign="center" my={4}>
                    <Heading>Create Account</Heading>
                    <Text maxW="md" fontSize="sm" color="gray.500" mt={4}>
                        With one of your social media accounts below or with your email
                    </Text>
                </Box>
                <SocialSignUp />
                <Flex align="center" justifyContent="center">
                    <Divider />
                    <p tw="m-4 font-bold">OR</p>
                    <Divider />
                </Flex>
                <ManualFormSignUp />
            </Box>
        </Flex>
    );
}
