import tw from "twin.macro";
import {
    Heading,
    Button,
    VStack,
    HStack,
    Flex,
    Text,
    Box,
    Link,
    Divider,
    StackDivider,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Input,
    ModalFooter,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import { Star, UserCircle, Heart } from "phosphor-react";
import { times } from "lodash";

function Desktop({ username, title, date, description, score, likes }: ReviewProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box w="full" pb={4}>
            <VStack alignItems="start">
                <HStack>
                    <Flex display="inline">
                        <UserCircle style={{ display: "inline" }} size={24} />
                    </Flex>
                    <span tw="tracking-wide">{username}</span>
                </HStack>
                <HStack>
                    <Flex display="inline">
                        {times(score).map((i) => (
                            <Star
                                tw="text-orange-500"
                                weight="fill"
                                key={i}
                                style={{ display: "inline" }}
                            />
                        ))}
                        {times(5 - score).map((i) => (
                            <Star tw="text-orange-500" key={i} style={{ display: "inline" }} />
                        ))}
                    </Flex>
                    <span tw="text-sm font-bold tracking-wide">{title}</span>
                </HStack>
                <span tw="font-semibold text-coolGray-500">Reviewed {date}</span>
                <Text>{description}</Text>
            </VStack>
            <HStack
                spacing={15}
                justifyContent="flex-end"
                flexDirection="row"
                divider={<StackDivider borderColor="gray.200" />}>
                <HStack spacing="1px">
                    <IconButton variant="ghost" aria-label="Like" icon={<Heart />} />
                    <span tw="text-sm tracking-wide">{likes}</span>
                </HStack>
                <Link onClick={onOpen}>Report</Link>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Report user {username}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="start">
                            <Text>Please specify reason for report below:</Text>
                            <Input placeholder="Report description..." size="lg" />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" variant="ghost" onClick={onClose}>
                            Send Report
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export type ReviewProps = {
    username: string;
    title: string;
    date: string;
    description: string;
    score: number;
    likes: number;
};

export function Review({ username, title, date, description, score, likes }: ReviewProps) {
    return (
        <Desktop
            username={username}
            title={title}
            date={date}
            description={description}
            score={score}
            likes={likes}
        />
    );
}
