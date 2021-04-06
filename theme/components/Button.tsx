import { ComponentSingleStyleConfig } from "@chakra-ui/react";

export const Button: ComponentSingleStyleConfig = {
    baseStyle: {
        fontFamily: "'Open Sans'",
        fontWeight: "semibold",
        transitionDuration: 1,
        flexShrink: 0,
    },
    variants: {
        primary: {
            p: 3,
            bg: "blueGray.700",
            color: "blueGray.200",
            minHeight: "44px",
            minWidth: "100px",
            _hover: {
                shadow: "lg",
            },
            outline: "none",
        },
        outline: {
            borderColor: "coolGray.200",
            border: "2px",
        },
    },
    defaultProps: {
        variant: "primary",
    },
};

export const IconButton: ComponentSingleStyleConfig = {
    baseStyle: {
        bg: "gray.200",
        _hover: {
            filter: "brightness(95%)",
        },
    },

    variants: {},
};

// p-2 bg-white border rounded-md shadow-sm transition-all
