import { HStack, VStack, Box, Image, Center, StackDivider, Flex, Button } from "@chakra-ui/react";
import "twin.macro";
import { User } from "phosphor-react";

import { NavBar } from "components/modules/NavBar";

const UserDetails = {
    user: "kawinie",
    firstname: "Kawin",
    lastname: "Pechetratanapanit",
    items: [
        {
            day: "Sun 2/14",
            time: "8:00 AM",
            price: 30,
        },
        {
            day: "Mon 2/15",
            time: "8:00 AM",
            price: 30,
        },
        {
            day: "Tue 2/16",
            time: "8:00 AM",
            price: 30,
        },
        {
            day: "Wed 2/17",
            time: "8:00 AM",
            price: 30,
        },
        {
            day: "Thu 2/18",
            time: "8:00 AM",
            price: 30,
        },
        {
            day: "Fri 2/19",
            time: "8:00 AM",
            price: 30,
        },
    ],
};

const RenderTimes = ({ data }: { data: any[] }) => {
    const total = 180;

    console.log(UserDetails.items);
    console.log(data);

    const times = data.map((data: any, index) => (
        <HStack key={index} w="full" tw=" flex justify-between">
            <span>
                {data.day} {data.time}
            </span>
            <span>$30</span>
        </HStack>
    ));

    console.log(times);

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

const getQueryParams = (query: any) => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
              .split("&")
              .reduce((params: any, param: any) => {
                  const [key, value] = param.split("=");
                  params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
                  return params;
              }, {})
        : {};
};

export default function Checkout() {
    const { data } = getQueryParams(window.location.search);

    const newData = JSON.parse(data);
    console.log(newData);
    const timesArray: any[] = [];

    for (const key in newData) {
        newData[key].forEach((time: any) => {
            if (time.selected) {
                timesArray.push({ day: key, time: time.time });
            }
        });
    }

    return (
        <VStack alignContent="center">
            <Box tw="sticky top-0 z-50" w="full">
                <NavBar username="John" />
            </Box>
            <Box pt={10}>
                <VStack>
                    <Image
                        my={10}
                        borderRadius={8}
                        boxSize="200px"
                        src="https://bit.ly/sage-adebayo"
                        alt="Segun Adebayo"
                    />
                    <span tw="text-2xl">
                        Confirm your booking with{" "}
                        <span tw="font-bold">
                            {UserDetails.firstname} {UserDetails.lastname}?
                        </span>
                    </span>
                    <RenderTimes data={timesArray} />
                    <VStack w="full" tw="items-end" py={14} spacing={4}>
                        <span tw="text-text-primary font-semibold">
                            You will be charged with the transaction fee upon order confirmation
                        </span>
                        <Button width="146px">Book Now</Button>
                    </VStack>
                </VStack>
            </Box>
        </VStack>
    );
}
