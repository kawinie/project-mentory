import "twin.macro";
import { HStack, VStack, Text, Divider, Icon, Checkbox, Tag as Bubble } from "@chakra-ui/react";
import {
    Sliders,
    DotsNine,
    Tag,
    CheckSquare,
    HourglassHigh,
    IconProps,
    Star,
} from "phosphor-react";
import React from "react";

const FilterTitle = () => {
    return (
        <VStack align="start" paddingTop="20px" paddingLeft="10px">
            <HStack>
                <Icon tw="transform rotate-90" weight="bold" boxSize={30} as={Sliders} />
                <Text fontSize="xl" fontWeight="bold">
                    Filter
                </Text>
            </HStack>
            <Divider orientation="horizontal" width="210px" />
        </VStack>
    );
};

type averageReviewsProps = { stars: number[] };

const AverageReviews = (props: averageReviewsProps) => {
    let numStars = 6;
    return (
        <VStack paddingLeft="10px" paddingBottom="20px" align="start">
            <HStack>
                <Icon weight="bold" boxSize={30} as={CheckSquare} />
                <Text fontSize="sm" fontWeight="bold">
                    Average Reviews
                </Text>
            </HStack>
            <VStack paddingLeft="6px" align="start">
                {props.stars.map((num, i) => {
                    numStars--;
                    return (
                        <HStack key={i}>
                            <Checkbox colorScheme="purple" />
                            {[...Array(numStars)].map((j) => (
                                <Icon key={j} as={Star} />
                            ))}
                            <Bubble size="sm" borderRadius="full">
                                {num}
                            </Bubble>
                        </HStack>
                    );
                })}
            </VStack>
        </VStack>
    );
};

type FilterComponentProps = {
    title: string;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    elements: { name: string; num: number }[];
};

const FilterComponent = (props: FilterComponentProps) => {
    return (
        <VStack paddingLeft="10px" align="start">
            <HStack>
                <Icon weight="bold" boxSize={30} as={props.icon} />
                <Text fontSize="sm" fontWeight="bold">
                    {props.title}
                </Text>
            </HStack>
            {props.elements.map((element) => (
                <VStack key={element.name} paddingLeft="6px" align="start">
                    <HStack>
                        <Checkbox colorScheme="purple">{element.name}</Checkbox>
                        <Bubble size="sm" borderRadius="full">
                            {element.num}
                        </Bubble>
                    </HStack>
                </VStack>
            ))}
        </VStack>
    );
};

type MentorFilterSidebarProps = {
    categories: { category: string; numCats: number }[];
    tags: { tag: string; numTags: number }[];
    availabilities: { availability: string; numAvails: number }[];
    stars: number[];
};

const MentorFilterSidebar = (props: MentorFilterSidebarProps) => {
    // Dummy data:
    const categories = [
        { name: "Software Engineering", num: 32 },
        { name: "UI/UX", num: 20 },
        { name: "Data Science", num: 12 },
    ];

    const tags = [
        { name: "React", num: 35 },
        { name: "SQL", num: 16 },
        { name: "Python", num: 20 },
    ];

    const availabilities = [
        { name: "30 hours", num: 2 },
        { name: "20 hours", num: 12 },
        { name: "10 hours", num: 22 },
    ];

    const stars = [13, 24, 21, 45, 32];

    return (
        <VStack
            spacing={8}
            h="85vh"
            w="260px"
            tw="border-gray-200 border-2 bottom-0 break-words"
            position="fixed"
            align="start"
            overflowY="auto"
            overflowX="hidden">
            <FilterTitle />
            <FilterComponent title="Categories" icon={DotsNine} elements={categories} />
            <FilterComponent title="Tags" icon={Tag} elements={tags} />
            <FilterComponent title="Availability" icon={HourglassHigh} elements={availabilities} />
            <AverageReviews stars={stars} />
        </VStack>
    );
};

export default MentorFilterSidebar;
