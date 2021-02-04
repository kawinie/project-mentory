import "twin.macro";
import Image from "next/image";
import { Box, HStack, AspectRatio, Button, Flex } from "@chakra-ui/react";
import { Star } from "phosphor-react";

type TabButtonProps = {
    isActive?: boolean;
};

function TabButton({ isActive }: TabButtonProps) {
    return (
        <Box
            tw="hover:(cursor-pointer bg-gray-200) active:(bg-white)"
            rounded="full"
            w={8}
            h={2}
            bgColor={isActive ? "white" : "gray.400"}></Box>
    );
}

export function ImageDisplay({ image }: { image: string }) {
    return (
        <Box tw="relative overflow-hidden" className="group">
            <AspectRatio ratio={4 / 3} bgColor="gray.100">
                {/* sizes=100% is needed here to make next/image work properly */}
                <Image src={image} sizes="100%" layout="fill" objectFit="cover" />
            </AspectRatio>
            <Button
                tw="absolute top-0 right-0 text-gray-200 rounded-none rounded-bl-xl"
                bgColor="rgba(0,0,0,0.5)"
                boxShadow="1px 4px 8px 0 rgba(0,0,0,0.1)"
                leftIcon={<Star tw="text-yellow-500" weight="fill" size={16} />}
                fontSize="sm"
                _hover={{ cursor: "default" }}
                _active={{}}>
                4.4 (125)
            </Button>
            <HStack
                tw="absolute bottom-0 w-full border-none transition delay-200 transform opacity-0 translate-y-full group-hover:(translate-y-0 opacity-100)"
                bgColor="rgba(0,0,0,0.50)"
                p={4}
                justify="center"
                spacing={2}>
                <TabButton isActive />
                <TabButton />
                <TabButton />
                <TabButton />
                <TabButton />
            </HStack>
        </Box>
    );
}
