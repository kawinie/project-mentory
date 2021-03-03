import "twin.macro";
import { useRef, forwardRef, ComponentPropsWithoutRef, useState, useEffect } from "react";
import { IconButton, HStack } from "@chakra-ui/react";
import { MagnifyingGlass, XCircle } from "phosphor-react";
import composeRefs from "@seznam/compose-react-refs";

export const SearchBar = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
    (props, externalRef) => {
        const ref = useRef<HTMLInputElement>(null);
        const [hasValue, setHasValue] = useState(false);

        // Detect change in value to conditionally render the close button
        useEffect(() => {
            const onchange = () => {
                setHasValue(ref.current?.value != "");
            };

            const current = ref.current;
            current?.addEventListener("input", onchange);
            return () => current?.removeEventListener("input", onchange);
        }, []);

        // Clear search field
        const onclick = () => {
            ref.current && (ref.current.value = "");
            setHasValue(false);
        };

        return (
            <HStack justify="start" bg="gray.100" rounded="xl" w="full" h="full" p={2} spacing={4}>
                <MagnifyingGlass size={24} />
                <input
                    tw="flex flex-grow bg-transparent outline-none"
                    type="search"
                    ref={composeRefs(ref, externalRef)}
                    {...props}
                />
                {hasValue && (
                    <IconButton
                        aria-label="clear search"
                        variant="unstyled"
                        boxSize={"24px"}
                        icon={<XCircle />}
                        onClick={onclick}
                    />
                )}
            </HStack>
        );
    }
);
