const colorPalette = require("tailwindcss/colors");

const colors = {
    ...colorPalette,
    primary: colorPalette.black,
    secondary: colorPalette.gray[500],
};

module.exports = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            // Enable all Tailwind color utilities
            colors: colors,
        },
        screens: {
            base: "0px",
            // => @media (min-width: 0px) { ... }

            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/custom-forms"), require("tailwindcss-debug-screens")],
};
