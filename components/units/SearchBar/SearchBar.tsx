import tw from "twin.macro";
import { IconButton, Box } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";

type TSearchBarProps = {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    filter?: boolean;
};

export function SearchBar(props: TSearchBarProps) {
    if (props.filter) {
        return (
            <Box tw="w-full h-8 flex bg-gray-100 items-center px-1 rounded-xl">
                <input
                    tw="w-full h-5/6 justify-center align-middle mx-3 bg-transparent outline-none"
                    {...props}
                />
            </Box>
        );
    }
    return (
        <Box tw="w-7/12 h-12 flex bg-gray-100 items-center px-1 rounded-xl">
            <IconButton aria-label="Search" variant="ghost" icon={<MagnifyingGlass size={25} />} />
            <input
                tw="w-full h-5/6 justify-center align-middle mx-1 bg-transparent outline-none"
                {...props}
            />
        </Box>
    );
}
