import tw from "twin.macro";
import { Heading, VStack, HStack, Flex, Text, Box, Link, Divider } from "@chakra-ui/react";
import { Star, UserCircle, Heart } from "phosphor-react";
import { times } from "lodash";

function Desktop({ username, title, date, review }: ReviewProps) {
    return (
        <Box w="500px">
            <VStack alignItems="start">
                <HStack>
                    <Flex display="inline">
                        <UserCircle style={{ display: "inline" }} size={24} />
                    </Flex>
                    <span tw="tracking-wide">{username}</span>
                </HStack>
                <HStack>
                    <Flex display="inline">
                        <Star tw="text-orange-500" weight="fill" style={{ display: "inline" }} />
                        <Star tw="text-orange-500" weight="fill" style={{ display: "inline" }} />
                        <Star tw="text-orange-500" weight="fill" style={{ display: "inline" }} />
                        <Star tw="text-orange-500" style={{ display: "inline" }} />
                        <Star tw="text-orange-500" style={{ display: "inline" }} />
                    </Flex>
                    <span tw="text-sm font-bold tracking-wide">{title}</span>
                </HStack>
                <span tw="font-semibold text-coolGray-500">Reviewed - {date}</span>
                <Text>{review}</Text>
            </VStack>
            <HStack justifyContent="flex-end" flexDirection="row">
                <Heart />
                <Link size="xl">Comment</Link>
                <Link>Report</Link>
            </HStack>
        </Box>
    );
}

export type ReviewProps = {
    username: string;
    title: string;
    date: string;
    review: string;
};

export function Review({ username, title, date, review }: ReviewProps) {
    return <Desktop username={username} title={title} date={date} review={review} />;
}
