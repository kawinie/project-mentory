const colors = require("./theme/colors");

module.exports = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                ...colors,
                primary: colors.coolGray[900],
                secondary: colors.coolGray[500],
                fade: "#DDE2F2",
                "text-primary": colors.blueGray[500],
                "text-primary-darker": colors.blueGray[700],
                "text-primary-lighter": colors.blueGray[200],
            },
        },
        screens: {
            base: "0px",
            // => @media (min-width: 0px) { ... }

            sm: "480px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }
        },
        fontSize: {
            xs: ".75rem",
            sm: ".875rem",
            md: "0.875rem",
            base: "0.875rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "4rem",
            "7xl": "5rem",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/custom-forms"), require("tailwindcss-debug-screens")],
};
