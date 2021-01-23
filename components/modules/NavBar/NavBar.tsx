import { useState } from "react";
import "twin.macro";
import {
    Box,
    Button,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SearchBar from "material-ui-search-bar";

type TNavBarProps = {
    name: string;
};

export function NavBar(props: TNavBarProps) {
    const [value, setValue] = useState("");

    return (
        <Flex
            bg="white"
            w="100%"
            h="70px"
            px={5}
            py={4}
            justifyContent="space-between"
            alignItems="center"
            position="fixed"
            tw="z-10">
            <Link href="/" fontSize="3xl" pl={3} color="black" tw="font-medium">
                Mentory
            </Link>
            <SearchBar
                tw="w-2/6"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                onRequestSearch={() => alert(value)}
            />
            <Box>
                <Link px={4} color="black">
                    Be Mentor
                </Link>
                <Menu>
                    <MenuButton
                        tw="m-2"
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        colorScheme="purple">
                        Hi, {props.name}!
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Profile">
                            <MenuItem>My Account</MenuItem>
                            <MenuItem>Payments </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Help">
                            <MenuItem>Docs</MenuItem>
                            <MenuItem>FAQ</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
}
