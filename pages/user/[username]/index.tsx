import {
    GetStaticPaths,
    InferGetStaticPropsType,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from "next";
import { gql, useQuery } from "@apollo/client";
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
    Link,
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
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import tw from "twin.macro";

import { NavBar } from "components/modules/NavBar";
import { ProfileImage, StatGroup } from "components/modules/MentorCard/components";
import { List } from "components/units";
import { addApolloState, initializeApollo } from "utils/apollo";
import { LayoutComponent } from "utils/layout";

/**
 * 1. Next/link works inside a Component and switches out that Component when performing client-side transition. This means that whatever is outside of <Component /> will not be rerendered
 * 2. On first visting to a page, the entire page needs to be prerendered. There is no way to do partial page rendering.
 */

const REACT_APP_BACKEND_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const query = gql`
    query User($firstname: String, $lastname: String) {
        users: userInfos(where: { firstname: $firstname, lastname: $lastname }) {
            firstname
            lastname
            city
            state
            about
            profileImg {
                url
            }

            tags {
                index
                tag {
                    label
                }
            }

            badges {
                label
            }
        }
    }
`;

function TopSection({
    firstname,
    lastname,
    profileImg,
    tags,
    badges,
    city,
    state,
    about,
    avgReviewScore,
}: any) /*eslint-disable-line*/ {
    const fullname = `${capitalize(firstname)} ${capitalize(lastname)}`;
    const imgUrl = `${REACT_APP_BACKEND_URL}${profileImg.url}`;
    type TagComponent = {
        index: number;
        tag: {
            label: string;
        };
    };
    return (
        <HStack alignItems="start" spacing={8}>
            <Box w="150px" flexShrink={0}>
                <ProfileImage url={imgUrl} />
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
                    <Text color="blueGray.500">{about}</Text>
                </Box>
                {/* Stat Group  */}
                <HStack justify="center" w="full">
                    <StatGroup
                        direction="row"
                        avgReviewScore={avgReviewScore}
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
                    as={Link}
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
    console.log(router.pathname, href);
    return (
        <NextLink href={href} scroll={false}>
            <a
                css={[
                    router.pathname === href
                        ? tw`text-blueGray-700 border-blueGray-700`
                        : tw`text-blueGray-500 border-blueGray-200 hover:text-blueGray-700`,
                    tw`block pb-4 font-semibold text-sm sm:text-base border-b-2 focus:outline-none focus:text-gray-900 whitespace-nowrap`,
                ]}
                className={className}>
                {label ?? children}
            </a>
        </NextLink>
    );
};

export type UserPageLayoutProps = {
    children?: ReactNode;
    firstname: string;
    lastname: string;
};

export const UserPageLayout: LayoutComponent<UserPageLayoutProps, typeof getStaticProps> = ({
    children,
    firstname,
    lastname,
}) => {
    const { data, loading } = useQuery(query, { variables: { firstname, lastname } });
    const user = data.users[0];

    return (
        <Box>
            <NavBar username={user.firstname} />
            <HStack mx="auto" maxW="container.md" mt={8} pos="relative">
                <SocialLinkList pos="absolute" top={0} pr={4} transform="translateX(-100%)" />
                <TopSection {...user} />
            </HStack>
            <ActiveLink href={`/user/${firstname}.${lastname}`} label="Index" />
            <ActiveLink href={`/user/${firstname}.${lastname}/about`} label="About" />
            {children}
        </Box>
    );
};

export default UserPageLayout;

/* -------------------------------------------------------------------------- */
/*                              Data Requirement                              */
/* -------------------------------------------------------------------------- */

type PageProps = {
    firstname: string;
    lastname: string;
};

const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ username: string }>): Promise<GetStaticPropsResult<PageProps>> => {
    const [firstname, lastname] = params?.username?.split(".") ?? [];
    if (firstname == undefined || lastname == undefined) {
        return {
            notFound: true,
        };
    }

    const client = initializeApollo();
    const response = await client.query({ query, variables: { firstname, lastname } });
    const users = response.data.users;
    if (response.error || users == null || users.length == 0) {
        return {
            notFound: true,
        };
    }

    return addApolloState(client, { props: { firstname, lastname } });
};

const getStaticPaths: GetStaticPaths = async () => {
    // TODO: Fetch popular users from cms
    const paths = ["bjarne.stroustrup"].map((username) => ({ params: { username } }));

    return { paths, fallback: "blocking" };
};

UserPageLayout.blockingDataRequirement = getStaticProps;

export { getStaticProps, getStaticPaths };
