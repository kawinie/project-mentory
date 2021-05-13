import tw from "twin.macro";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import NextImage from "next/image";
import NextLink from "next/link";
import {
    Box,
    Heading,
    HStack,
    Tag,
    VStack,
    TagLeftIcon,
    TagLabel,
    Text,
    Divider,
    Button,
    StackProps,
    AspectRatio,
} from "@chakra-ui/react";
import {
    Circle,
    FacebookLogo,
    MapPin,
    Icon as PhosphorIcon,
    TwitterLogo,
    LinkedinLogo,
} from "phosphor-react";
import { capitalize } from "lodash";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

import { NavBar } from "components/modules/NavBar";
import { StatGroup } from "components/modules/MentorCard/components";
import { List } from "components/units";
import { initializeApollo } from "utils/apollo";
import { LayoutComponent } from "utils/layout";
import { strapiImgLoader } from "utils/strapi";

import query from "./gql/index.gql";

function TopSection({
    firstname,
    lastname,
    profileImg,
    tags,
    badges,
    city,
    state,
    brief,
    avgReviewScore,
}: any) /*eslint-disable-line*/ {
    const fullname = `${capitalize(firstname)} ${capitalize(lastname)}`;

    type TagComponent = {
        index: number;
        tag: {
            label: string;
        };
    };

    return (
        <HStack alignItems="start" spacing={8}>
            <Box w="150px" flexShrink={0}>
                <AspectRatio w="full" ratio={1} rounded="md" overflow="hidden">
                    <NextImage
                        loader={strapiImgLoader ?? ""}
                        src={profileImg.url}
                        sizes="100%"
                        layout="fill"
                        objectFit="cover"
                    />
                </AspectRatio>
            </Box>
            <VStack justify="start" alignItems="start" spacing={4}>
                <VStack alignItems="start" w="full" spacing={2}>
                    {/* Tags */}
                    <HStack justify="start" spacing={4}>
                        {tags.map(({ index, tag }: TagComponent) => (
                            <Tag
                                key={tag.label}
                                variant="text"
                                color={index == 0 ? "blueGray.700" : "blueGray.500"}
                                fontWeight={index == 0 ? "semibold" : "normal"}>
                                {tag.label}
                            </Tag>
                        ))}
                    </HStack>
                    {/* Name and badge */}
                    <HStack justify="start" mb="2">
                        <Heading fontSize="24px">{fullname}</Heading>
                        {badges.map(({ label }: { label: string }) => (
                            <Tag key={label} variant="badge" fontSize="xs">
                                {label}
                            </Tag>
                        ))}
                    </HStack>
                    <Divider />
                </VStack>
                {/* Secondary Information */}
                <HStack justify="start" divider={<Circle tw="mx-2" weight="fill" size={4} />}>
                    <Tag variant="text">
                        <TagLeftIcon boxSize="16px" as={MapPin} />
                        <TagLabel>{`${city}, ${state}`}</TagLabel>
                    </Tag>
                    <Tag bg="blueGray.200" fontSize="xs">
                        40+ years
                    </Tag>
                </HStack>
                {/* About */}
                <Box>
                    <Text fontSize="sm" color="blueGray.500">
                        {brief}
                    </Text>
                </Box>
                {/* Stat Group  */}
                {/* TODO: Connect noEndorsements and noReviews */}
                <HStack justify="center" w="full">
                    <StatGroup
                        direction="row"
                        avgReviewScore={avgReviewScore ?? 0}
                        noEndorsements={0}
                        noReviews={0}
                        css={{ border: "0px" }}
                    />
                </HStack>
                {/* Action Buttons */}
                <Button textTransform="uppercase" fontWeight="bold">
                    Book Now
                </Button>
            </VStack>
        </HStack>
    );
}

function SocialLinkList(props: StackProps) {
    const $ = (href: string, label: string, icon?: PhosphorIcon) => ({ href, label, icon });
    const socialLinks = [
        $("https://facebook.com", "Facebook", FacebookLogo),
        $("https://twitter.com", "Twitter", TwitterLogo),
        $("https://linkedin.com", "Linkedin", LinkedinLogo),
    ];

    return (
        <List
            spacing={0}
            direction="column"
            {...props}
            items={socialLinks}
            renderItem={({ href, label, icon: Icon }) => (
                <Button
                    as={"a"}
                    href={href}
                    variant="ghost"
                    width="full"
                    justifyContent="start"
                    leftIcon={Icon && <Icon size={24} />}>
                    {label}
                </Button>
            )}
        />
    );
}

type ActiveLinkProps = {
    href: string;
    label?: string;
    children?: ReactNode;
    className?: string;
};

const ActiveLink = ({ children, href, className, label }: ActiveLinkProps) => {
    const router = useRouter();
    return (
        <NextLink href={href} scroll={false}>
            <a
                css={[
                    router.asPath === href
                        ? tw`text-blueGray-700 border-blueGray-700`
                        : tw`text-blueGray-500 border-blueGray-200 hover:text-blueGray-700`,
                    tw`block pb-4 px-4 cursor-pointer font-semibold text-sm sm:text-base border-b-2 focus:outline-none focus:text-gray-900 whitespace-nowrap`,
                ]}
                className={className}>
                {label ?? children}
            </a>
        </NextLink>
    );
};

/* -------------------------------------------------------------------------- */
/*                               UserPageLayout                               */
/* -------------------------------------------------------------------------- */

export type UserPageLayoutProps = {
    children?: ReactNode;
    username: string;
    firstname: string;
    lastname: string;
    city: string;
    state: string;
    brief: string;

    profileImg: {
        url: string;
    };

    tags: {
        index: string;
        tag: {
            label: string;
        };
    }[];

    badges: {
        label: string;
    }[];
};

export const UserPageLayout: LayoutComponent<UserPageLayoutProps, Params> = ({
    children,
    ...props
}) => {
    const username = useSelector((state) => state.currentUsername);

    return (
        <Box>
            <NavBar username={username ?? "User"} />
            <HStack mx="auto" alignItems="start" maxW="container.lg" spacing={8} mt={8}>
                <SocialLinkList />
                <Box flexGrow={1}>
                    <TopSection {...props} />

                    <HStack spacing={0} my={16} alignItems="stretch">
                        {[
                            { href: "about", label: "About" },
                            { href: "availability", label: "Availability" },
                            { href: "reviews", label: "Reviews" },
                            { href: "tags", label: "Tags" },
                        ].map(({ href, label }) => (
                            <ActiveLink
                                key={label}
                                href={`/users/${props.username}/${href}`}
                                label={label}
                            />
                        ))}
                        <div tw="flex flex-col w-full border-b-2 border-blueGray-200" />
                    </HStack>
                    {children}
                </Box>
            </HStack>
        </Box>
    );
};

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */

type Params = {
    username: string;
};

const getStaticProps: GetStaticProps<UserPageLayoutProps, Params> = async ({ params }) => {
    if (params == undefined) {
        return { notFound: true };
    }

    const { username } = params;

    const client = initializeApollo();
    const { data, error } = await client.query({ query, variables: { username } });
    if (error || data.users == null || data.users.length == 0) {
        return { notFound: true };
    }

    console.log("Data", data);

    return {
        props: {
            username,
            ...data.users[0],
        },
    };
};

const getStaticPaths: GetStaticPaths = async () => {
    const paths = [].map((username) => ({ params: { username } }));
    return { paths, fallback: "blocking" };
};

UserPageLayout.blockingDataRequirement = getStaticProps;
export { getStaticProps, getStaticPaths, UserPageLayout as default };
