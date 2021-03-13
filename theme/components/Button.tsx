import { ComponentSingleStyleConfig } from "@chakra-ui/react";

export const Button: ComponentSingleStyleConfig = {
    baseStyle: {
        fontFamily: "'Open Sans'",
        fontWeight: "semibold",
        transitionDuration: 1,
        flexShrink: 0,
        borderRadius: "lg",
        _hover: {
            shadow: "lg",
        },
        outline: "none",
    },
    variants: {
        primary: {
            bg: "blueGray.900",
            color: "blueGray.200",
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
