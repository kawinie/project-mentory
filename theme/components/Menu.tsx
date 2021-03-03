import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const Menu: ComponentMultiStyleConfig = {
    parts: ["item"],

    baseStyle: {
        item: {
            _focus: {
                outline: "none",
            },
        },
    },
};
