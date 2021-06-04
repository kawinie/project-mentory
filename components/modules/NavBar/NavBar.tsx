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
import { ReactElement, useCallback } from "react";

import { SearchBar } from "components/units/SearchBar";
import { useScreen } from "hooks";
import { List } from "components/units/List";
import { logout } from "lib/auth";

/* -------------------------------------------------------------------------- */
/*                             NavBar Menu Button                             */
/* -------------------------------------------------------------------------- */

type Item = {
    title: string;
    action?: () => void;
};

type ItemGroup = { title: string; items: Item[] };
type MenuButtonProps = ButtonProps & {
    title: string;
    itemGroups: ItemGroup[];
    mobileIcon?: ReactElement;
};

function NavBarMenuButton({ title, itemGroups, mobileIcon, ...props }: MenuButtonProps) {
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
                                onClick={item.action}
                                key={item.title}
                                _hover={{ filter: "brightness(95%)" }}>
                                {item.title}
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

function Desktop({ username }: NavBarProps) {
    const router = useRouter();

    const navMenuItems = [
        { href: "/signup", label: "Become a Mentor" },
        { href: "/faq", label: "FAQ" },
    ];

    const userItemGroups: MenuButtonProps["itemGroups"] = [
        {
            title: "Profile",
            items: [
                { title: "My Account", action: () => router.push("/users/me/edit") },
                {
                    title: "Log Out",
                    action: () => {
                        logout();
                        router.push("/login");
                    },
                },
            ],
        },
    ];

    return (
        <HStack {...styleProps}>
            <Heading letterSpacing="wide" size="lg">
                <NextLink href="/landing" passHref>
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
                title={`Hi ${username}!`}
                itemGroups={userItemGroups}
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
