import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import twconfig from "tailwind.config.js";

import { Button } from "./components/Button";

const { base: _, ...breakpointValues } = twconfig.theme.screens;

export default extendTheme({
    breakpoints: createBreakpoints({ ...breakpointValues } as const),
    colors: { ...twconfig.theme.extend.colors },
    styles: {
        global: {
            a: {
                color: "purple.700",
                _hover: {
                    color: "purple.500",
                    textDecoration: "underline",
                },
            },
        },
    },
    fonts: {
        heading: "Roboto",
        body: "Roboto",
    },

    // components: {
    //     Button,
    // },
});
