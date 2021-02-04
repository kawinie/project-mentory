import "twin.macro";
import { ReactElement } from "react";
import { HStack, VStack, Checkbox, Box, Flex, Heading, Badge } from "@chakra-ui/react";
import { Sliders, DotsNine, Tag, CheckSquare, HourglassHigh, Star } from "phosphor-react";
import { times } from "lodash";

/* -------------------------------------------------------------------------- */
/*                                  Mock Data                                 */
/* -------------------------------------------------------------------------- */

const categories = [
    { name: "Software Engineering", count: 32 },
    { name: "UI/UX", count: 20 },
    { name: "Data Science", count: 12 },
];

const tags = [
    { name: "React", count: 35 },
    { name: "SQL", count: 16 },
    { name: "Python", count: 20 },
];

const availabilities = [
    { name: "30 hours", count: 2 },
    { name: "20 hours", count: 12 },
    { name: "10 hours", count: 22 },
];

const __review_counts = [13, 24, 21, 45, 32];
const averageReviews = __review_counts.map((n, i) => ({
    star: __review_counts.length - i,
    count: n,
}));

/* -------------------------------------------------------------------------- */
/*                                Filter Option                               */
/* -------------------------------------------------------------------------- */

type FilterOptionProps = {
    inlineElement: ReactElement;
    count: number;
    isSelected?: boolean;
};

function FilterOption({ inlineElement, count, isSelected }: FilterOptionProps) {
    return (
        <Checkbox size={"md"} isChecked={isSelected}>
            <span tw="mr-2 text-sm">{inlineElement}</span>
            <Badge tw="px-2 bg-blueGray-200 text-secondary rounded-full">{count}</Badge>
        </Checkbox>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Filter Section                               */
/* -------------------------------------------------------------------------- */

type FilterSectionProps = {
    title: string;
    icon: ReactElement;
    options: FilterOptionProps[];
};

function FilterSection({ title, icon, options }: FilterSectionProps) {
    return (
        <VStack px={8} flexShrink={0} spacing={4} alignItems="start">
            <HStack tw="font-bold">
                {icon}
                <span tw="text-sm font-bold tracking-wide">{title}</span>
            </HStack>
            <VStack flexShrink={0} alignItems="start" paddingLeft={4} spacing={2}>
                {options.map((opt, index) => (
                    <FilterOption key={index} {...opt} />
                ))}
            </VStack>
        </VStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Filter Sidebar                               */
/* -------------------------------------------------------------------------- */

export function FilterSidebar() {
    return (
        <Box tw="overflow-hidden p-8 h-full flex-shrink-0">
            {/* We need to wrap the scrollable content in a div to fix safari bug
            See https://stackoverflow.com/questions/57934803/workaround-for-a-safari-position-sticky-webkit-sticky-bug */}
            <Box tw="overflow-y-scroll h-full shadow-lg rounded-md bg-white">
                <VStack spacing={8} alignItems="stretch">
                    <HStack tw="border-b p-8 sticky top-0 rounded-t-md bg-white z-10">
                        <Sliders size={24} />
                        <Heading fontSize="xl" fontWeight="bold">
                            Filter
                        </Heading>
                    </HStack>

                    {/* Filter sections */}
                    {/* This can be greatly simplified with a loop. But I think this is clearer */}
                    <FilterSection
                        title="Categories"
                        icon={<DotsNine size={24} />}
                        options={categories.map((cat) => ({
                            inlineElement: <>{cat.name}</>,
                            count: cat.count,
                        }))}
                    />

                    <FilterSection
                        title="Tags"
                        icon={<Tag size={24} />}
                        options={tags.map((tag) => ({
                            inlineElement: <>{tag.name}</>,
                            count: tag.count,
                        }))}
                    />

                    <FilterSection
                        title="Availability"
                        icon={<HourglassHigh size={24} />}
                        options={availabilities.map((avail) => ({
                            inlineElement: <>{avail.name}</>,
                            count: avail.count,
                        }))}
                    />

                    <FilterSection
                        title="Avg. Reviews"
                        icon={<CheckSquare size={24} />}
                        options={averageReviews.map((review) => ({
                            inlineElement: (
                                <Flex display="inline">
                                    {times(review.star).map((i) => (
                                        <Star
                                            tw="text-orange-500"
                                            weight="fill"
                                            key={i}
                                            style={{ display: "inline" }}
                                        />
                                    ))}
                                    {times(5 - review.star).map((i) => (
                                        <Star
                                            tw="text-orange-500"
                                            key={i}
                                            style={{ display: "inline" }}
                                        />
                                    ))}
                                </Flex>
                            ),
                            count: review.count,
                        }))}
                    />

                    <div tw="pb-4" />
                </VStack>
            </Box>
        </Box>
    );
}
