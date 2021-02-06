import "twin.macro";
import {
    Box,
    Button,
    Flex,
    HStack,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuGroup,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { User } from "phosphor-react";

import { SearchBar } from "components/units/SearchBar";
import { useScreen } from "hooks";

type TNavBarProps = {
    name: string;
};

export function NavBar(props: TNavBarProps) {
    const { min, max } = useScreen();

    return (
        <Flex
            tw="shadow-md z-20"
            bg="white"
            w="100%"
            h="70px"
            px={5}
            py={4}
            alignItems="center"
            position="relative">
            {max`sm` && (
                <HStack spacing={5} tw="flex align-middle w-full justify-center items-center">
                    <Link href="/" fontSize="2xl" color="black" tw="font-medium m-auto text-center">
                        Mentory
                    </Link>
                    <HStack
                        spacing={5}
                        tw="relative flex w-2/3 justify-center items-center self-center">
                        <SearchBar label="search" name="search" placeholder="Search..." />
                        <Menu>
                            <MenuButton
                                tw="inline-block h-12 text-sm text-left min-w-min"
                                as={Button}
                                variant="outline"
                                rightIcon={<ChevronDownIcon />}>
                                Categories
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Design</MenuItem>
                                <MenuItem>Programming</MenuItem>
                                <MenuItem>Business</MenuItem>
                                <MenuItem>Makeup</MenuItem>
                                <MenuItem>Life</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                    <Menu>
                        <MenuButton tw="w-1/4 h-12" as={Button} variant="outline">
                            <HamburgerIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title="Profile">
                                <MenuItem>My Account</MenuItem>
                                <MenuItem>Payments </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Join">
                                <MenuItem>Find a Mentor</MenuItem>
                                <MenuItem>Be a Mentor</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Help">
                                <MenuItem>Docs</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </HStack>
            )}
            {min`sm` && (
                <HStack tw="flex w-full justify-between items-center">
                    <Link href="/" fontSize="4xl" color="black" tw="font-medium pr-5">
                        Mentory
                    </Link>
                    <HStack spacing={5} tw="relative flex w-2/3 justify-center items-center">
                        <SearchBar label="search" name="search" placeholder="Search..." />
                        <Menu>
                            <MenuButton
                                tw="inline-block h-12 text-sm text-left min-w-min"
                                as={Button}
                                variant="outline"
                                rightIcon={<ChevronDownIcon />}>
                                Categories
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Design</MenuItem>
                                <MenuItem>Programming</MenuItem>
                                <MenuItem>Business</MenuItem>
                                <MenuItem>Makeup</MenuItem>
                                <MenuItem>Life</MenuItem>
                            </MenuList>
                        </Menu>
                        <Box tw="relative flex justify-center items-center align-middle">
                            <Link px={4} tw="underline" color="black">
                                Find a Mentor
                            </Link>
                            <Link px={4} color="black">
                                Be a Mentor
                            </Link>
                        </Box>
                    </HStack>
                    <Menu>
                        <MenuButton
                            tw="min-w-min h-12"
                            as={Button}
                            leftIcon={<User size={30} />}
                            rightIcon={<ChevronDownIcon />}
                            bg="white">
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
                </HStack>
            )}
        </Flex>
    );
}
