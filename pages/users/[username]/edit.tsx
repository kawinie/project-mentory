import { Box, HStack } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { NavBar } from "components/modules/NavBar";

function Header() {
    const username = useSelector((state) => state.username);

    return (
        <Box>
            <NavBar username={username} />
            <Box mx="auto" alignItems="start" maxW="container.lg" spacing={8} mt={8}></Box>
        </Box>
    );
}

function Edit() {
    const router = useRouter();
    const username = useSelector((state) => state.username);
    useEffect(() => {
        if (username === "") {
            router.push("/login");
        }
    }, [username, router]);

    return (
        <Box>
            <Header />
            <HStack></HStack>
        </Box>
    );
}

export default Edit;
