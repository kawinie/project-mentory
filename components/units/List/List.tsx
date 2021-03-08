import { ReactElement, Key } from "react";
import { Stack, StackDirection, StackProps } from "@chakra-ui/react";

export type ListProps<T> = StackProps & {
    direction?: StackDirection;
    items: T[];
    renderItem: (item: T) => ReactElement;
};

export function List<T extends { [key: string]: unknown; key?: Key | null | undefined }>({
    direction = "row",
    items,
    renderItem,
    ...props
}: ListProps<T>) {
    return (
        <Stack
            marginInlineStart="0 !important"
            direction={direction}
            as="ul"
            listStyleType="none"
            textDecoration="none"
            p={0}
            m={0}
            spacing={[4, null, 8]}
            {...props}>
            {items.map((item, i) => (
                <li key={item.key ?? i}>{renderItem(item)}</li>
            ))}
        </Stack>
    );
}
