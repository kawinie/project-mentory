import "twin.macro";
import { ReactElement } from "react";
import { css } from "@emotion/react";
import { HStack, VStack, Checkbox, Box, Flex, Heading, Badge } from "@chakra-ui/react";
import { Star } from "phosphor-react";
import { times } from "lodash";

import { SearchBar } from "components/units/SearchBar";
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

const languages = [
    { name: "English", count: 42 },
    { name: "Japanese", count: 12 },
    { name: "Danish", count: 3 },
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
        <Checkbox size={"md"} isChecked={isSelected} colorScheme="gray">
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
    options: FilterOptionProps[];
    searchbar: boolean;
    placeholder?: string;
};

function FilterSection({ title, options, searchbar, placeholder }: FilterSectionProps) {
    return (
        <VStack px={8} flexShrink={0} spacing={4} alignItems="start">
            <HStack tw="font-bold">
                <span tw="text-sm font-bold tracking-wide">{title}</span>
            </HStack>
            {searchbar ? (
                <SearchBar label="search" name="search" filter={true} placeholder={placeholder} />
            ) : null}
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
        <Box tw="overflow-hidden h-full p-8 flex-shrink-0">
            {/* We need to wrap the scrollable content in a div to fix safari bug
            See https://stackoverflow.com/questions/57934803/workaround-for-a-safari-position-sticky-webkit-sticky-bug */}
            <Box
                tw="overflow-y-scroll h-full shadow-lg rounded-md bg-white"
                css={css`
                    ::-webkit-scrollbar {
                        width: 6px;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: rgba(55, 65, 81, 0.5);
                        border-radius: 20px;
                    }
                `}>
                <VStack spacing={8} alignItems="stretch">
                    <HStack tw="border-b p-8 sticky top-0 rounded-t-md bg-white z-10">
                        <Heading fontSize="xl" fontWeight="bold">
                            Filter
                        </Heading>
                    </HStack>

                    {/* Filter sections */}
                    {/* This can be greatly simplified with a loop. But I think this is clearer */}
                    <FilterSection
                        title="Categories"
                        searchbar={true}
                        placeholder="Search categories..."
                        options={categories.map((cat) => ({
                            inlineElement: <>{cat.name}</>,
                            count: cat.count,
                        }))}
                    />

                    <FilterSection
                        title="Tags"
                        searchbar={true}
                        placeholder="Search tags..."
                        options={tags.map((tag) => ({
                            inlineElement: <>{tag.name}</>,
                            count: tag.count,
                        }))}
                    />

                    <FilterSection
                        title="Languages"
                        searchbar={true}
                        placeholder="Search languages..."
                        options={languages.map((lang) => ({
                            inlineElement: <>{lang.name}</>,
                            count: lang.count,
                        }))}
                    />

                    <FilterSection
                        title="Availability"
                        searchbar={false}
                        options={availabilities.map((avail) => ({
                            inlineElement: <>{avail.name}</>,
                            count: avail.count,
                        }))}
                    />

                    <FilterSection
                        title="Avg. Reviews"
                        searchbar={false}
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
