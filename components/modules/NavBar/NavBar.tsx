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
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SearchBar from "material-ui-search-bar";

import { useScreen } from "hooks";

type TNavBarProps = {
    name: string;
};

export function NavBar(props: TNavBarProps) {
    const [value, setValue] = useState("");
    const { min, max } = useScreen();

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
                onCancelSearch={() => setValue("")}
            />
            {max`sm` && (
                <Box>
                    <Menu>
                        <MenuButton tw="m-2" as={Button} colorScheme="purple">
                            <HamburgerIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title="Profile">
                                <MenuItem>My Account</MenuItem>
                                <MenuItem>Payments </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Join">
                                <MenuItem>Be a Mentor</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Help">
                                <MenuItem>Docs</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box>
            )}
            {min`sm` && (
                <Box>
                    <Menu>
                        <MenuButton
                            tw="w-24 text-sm mr-64"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}>
                            Category
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Design</MenuItem>
                            <MenuItem>Programming</MenuItem>
                            <MenuItem>Business</MenuItem>
                            <MenuItem>Makeup</MenuItem>
                            <MenuItem>Life</MenuItem>
                        </MenuList>
                    </Menu>
                    <Link px={4} color="black">
                        Be a Mentor
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
            )}
        </Flex>
    );
}
