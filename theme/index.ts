import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import twconfig from "tailwind.config.js";

import { Button } from "./components/Button";
import { Tag } from "./components/Tag";
import { Menu } from "./components/Menu";

const { base: _, ...breakpointValues } = twconfig.theme.screens;

export default extendTheme({
    breakpoints: createBreakpoints({ ...breakpointValues } as const),
    colors: { ...twconfig.theme.extend.colors },
    components: {
        Button,
        Tag,
        Menu,
    },
    styles: {
        global: {
            a: {
                _hover: {
                    textDecoration: "underline",
                },
            },
        },
    },
    fonts: {
        heading: "Roboto",
        body: "'Open Sans'",
    },

    fontSizes: { ...twconfig.theme.fontSize },
});
