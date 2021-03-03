import { ReactElement } from "react";
import { HStack } from "@chakra-ui/react";

type ListProps<T extends unknown> = {
    items: T[];
    renderItem: (item: T) => ReactElement;
};

export function List<T>({ items, renderItem }: ListProps<T>) {
    return (
        <HStack as="ul" spacing={[4, null, 8]}>
            {items.map((item, i) => (
                <li key={i}>{renderItem(item)}</li>
            ))}
        </HStack>
    );
}
