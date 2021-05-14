import { HStack, VStack, Box, StackDivider, Button } from "@chakra-ui/react";
import "twin.macro";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { NavBar } from "components/modules/NavBar";

import mutation from "./gql/transaction.gql";

function formatTime(time: string) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const fullDate = new Date(time);
    const day = days[fullDate.getDay()];
    const date = fullDate.getDate();
    const month = fullDate.getMonth();
    const hours = fullDate.getHours();
    const minutes = (fullDate.getMinutes() < 10 ? "0" : "") + fullDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    let timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    } else if (hours > 12) {
        timeValue = "" + (hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }

    return day + " " + month + "/" + date + " @ " + timeValue + ":" + minutes + " " + ampm;
}

const RenderTimes = ({ data }: { data: any[] }) => {
    const total = 30 * data.length;

    const times = data.map((daytime, index) => (
        <HStack key={index} w="full" tw=" flex justify-between">
            <span>{formatTime(daytime.transactionDateTime)}</span>
            <span>$30</span>
        </HStack>
    ));

    const fees = Math.round(total * 0.1 * 100) / 100;
    return (
        <VStack divider={<StackDivider borderColor="gray.200" />} w="full" tw="items-start" pt={8}>
            <span tw="font-semibold">Details</span>
            <Box w="full">
                <VStack tw="items-start" py={2}>
                    <HStack w="full" pb={2} tw="flex justify-between font-semibold">
                        <span>Items</span>
                        <span>Price</span>
                    </HStack>
                    {times}
                </VStack>
            </Box>
            <Box w="full" pl="67%" py={2}>
                <VStack tw="items-start">
                    <HStack w="full" tw="flex justify-between">
                        <span tw="font-bold">Subtotal</span>
                        <span>${total}</span>
                    </HStack>
                    <HStack w="full" tw="flex justify-between">
                        <span tw="font-bold">Transaction Fees</span>
                        <span>${fees}</span>
                    </HStack>
                </VStack>
            </Box>
        </VStack>
    );
};

export default function Checkout() {
    const [createTransaction] = useMutation(mutation);
    const currentTransaction = useSelector((state) => state.currentTransaction);
    const username = useSelector((state) => state.currentUsername);
    const router = useRouter();

    if (currentTransaction == null) {
        return <Box />;
    }

    return (
        <VStack alignContent="center">
            <Box tw="sticky top-0 z-50" w="full">
                <NavBar username={username ?? "User"} />
            </Box>
            <Box pt={10}>
                <VStack pt={20}>
                    <span tw="text-2xl">
                        Confirm your booking with{" "}
                        <span tw="font-bold">{currentTransaction.mentor}</span>
                    </span>
                    <RenderTimes data={currentTransaction.meeting} />
                    <VStack w="full" tw="items-end" py={14} spacing={4}>
                        <span tw="text-text-primary font-semibold">
                            You will be charged with the transaction fee upon order confirmation
                        </span>
                        <Button
                            width="146px"
                            onClick={() => {
                                createTransaction({ variables: currentTransaction });
                                alert("You have successfully checked out!");
                                router.push("/mentor-listing");
                            }}>
                            Book Now
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </VStack>
    );
}
