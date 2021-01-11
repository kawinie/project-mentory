import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import twconfig from "tailwind.config.js";
const { base: _, ...breakpointValues } = twconfig.theme.screens;

export default extendTheme({
    breakpoints: createBreakpoints({ ...breakpointValues } as const),
    styles: {
        global: {
            a: {
                color: "#805AD5",
                _hover: {
                    color: "purple.700",
                    textDecoration: "underline",
                },
            },
        },
    },
});
