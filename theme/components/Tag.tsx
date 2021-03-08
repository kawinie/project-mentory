import { ComponentMultiStyleConfig, ComponentSingleStyleConfig } from "@chakra-ui/react";

export const Tag: ComponentMultiStyleConfig = {
    parts: ["container"],
    baseStyle: {},

    variants: {
        primary: {
            container: {
                textTransform: "capitalize",
                rounded: "full",
                bg: "transparent",
                border: "1px",
                borderColor: "gray.200",
                color: "secondary",
                flexShrink: 0,
                fontSize: "xs",
            },
        },
        badge: {
            container: {
                bg: "amber.400",
                py: 0.5,
                px: 1.5,
                rounded: "sm",
                fontWeight: "normal",
                fontFamily: "menlo",
            },
        },

        text: {
            container: {
                m: 0,
                p: 0,
            },
        },
    },
    defaultProps: {},
};
