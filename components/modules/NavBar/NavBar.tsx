import "twin.macro";
import NextLink from "next/link";
import {
    IconButton,
    Button,
    ButtonProps,
    HStack,
    StackProps,
    Heading,
    Menu,
    MenuButton as _MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    Grid,
    Link,
} from "@chakra-ui/react";
import { CaretDown, UserCircle } from "phosphor-react";
import { omit } from "lodash";

import { useRouter } from "next/router";
import { ReactElement, Fragment } from "react";
import { useQuery } from "@apollo/client";

import filterTypes from "pages/gql/filterTypes.gql";
import { SearchBar } from "components/units/SearchBar";
import { useScreen } from "hooks";
import { List } from "components/units/List";

import { logout } from "../../../lib/auth";

/* -------------------------------------------------------------------------- */
/*                             NavBar Menu Button                             */
/* -------------------------------------------------------------------------- */

type ItemGroup = { title: string; items: string[] };
type MenuButtonProps = ButtonProps & {
    title: string;
    itemGroups: ItemGroup[];
    mobileIcon?: ReactElement;
};

function NavBarMenuButton({ title, itemGroups, mobileIcon, ...props }: MenuButtonProps) {
    const router = useRouter();
    function logoutUser() {
        logout();
        router.push("/login");
    }

    const { min, max } = useScreen();
    const common = {
        w: "100%",
        variant: "outline",
        _focus: { shadow: "none", outline: "none" },
        ...props,
    };

    const iconButtonProps = omit(common, "leftIcon", "rightIcon");

    return (
        <Menu isLazy>
            {max`md` && (
                <_MenuButton
                    as={IconButton}
                    icon={mobileIcon ?? props.leftIcon ?? props.rightIcon}
                    {...iconButtonProps}
                />
            )}
            {min`md` && (
                <_MenuButton as={Button} {...common}>
                    {title}
                </_MenuButton>
            )}
            <MenuList>
                {itemGroups.map(({ title, items }) => (
                    <MenuGroup key={title} title={title}>
                        {items.map((item) => (
                            <MenuItem
                                onClick={item === "Log Out" ? () => logoutUser() : () => null}
                                key={item}
                                _hover={{ filter: "brightness(95%)" }}>
                                {item}
                            </MenuItem>
                        ))}
                    </MenuGroup>
                ))}
            </MenuList>
        </Menu>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Desktop                                  */
/* -------------------------------------------------------------------------- */

const styleProps: StackProps = {
    h: "70px",
    py: 3,
    px: 8,
    bg: "white",
    alignItems: "center",
    spacing: 4,
    justify: "space-between",
    w: "full",
    shadow: "lg",
    fontWeight: "semibold",
};

const navMenuItems = [
    { href: "/join", label: "Become a Mentor" },
    { href: "/faq", label: "FAQ" },
];

const userMenuItems = [
    { title: "Profile", items: ["My Account", "Payments"] },
    { title: "Help", items: ["Docs", "FAQ", "Log Out"] },
];

function Desktop({ username }: NavBarProps) {
    return (
        <HStack {...styleProps}>
            <Heading letterSpacing="wide" size="lg">
                <NextLink href="/mentor-listing" passHref>
                    <Link whiteSpace="nowrap">Mentory</Link>
                </NextLink>
            </Heading>
            <Grid templateColumns="minmax(0, 1fr) max-content" gap={4} maxWidth="800px" w="full">
                <SearchBar placeholder="Search mentor..." />
            </Grid>
            <List
                items={navMenuItems}
                renderItem={(item) => (
                    <NextLink href={item.href} passHref>
                        <Link whiteSpace="nowrap" fontSize="sm">
                            {item.label}
                        </Link>
                    </NextLink>
                )}
            />
            <NavBarMenuButton
                w="max-content"
                variant="ghost"
                leftIcon={<UserCircle tw="inline" size={24} />}
                rightIcon={<CaretDown tw="inline" size={24} />}
                title={`Hi, ${username}!`}
                itemGroups={userMenuItems}
            />
        </HStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   NavBar                                   */
/* -------------------------------------------------------------------------- */

export type NavBarProps = {
    username: string;
};

export function NavBar({ username }: NavBarProps) {
    return <Desktop username={username} />;
}
