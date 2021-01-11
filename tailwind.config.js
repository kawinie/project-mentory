const colors = require("tailwindcss/colors");
colors.primary = colors.black;
colors.secondary = colors.gray[500];

module.exports = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            // Enable all Tailwind color utilities
            colors: colors,
        },
        screens: {
            mobile: "0px",
            // => @media (min-width: 0px) { ... }

            "mobile-ls": "640px",
            // => @media (min-width: 640px) { ... }

            tablet: "768px",
            // => @media (min-width: 768px) { ... }

            "tablet-ls": "1024px",
            // => @media (min-width: 1024px) { ... }

            laptop: "1280px",
            // => @media (min-width: 1280px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/custom-forms"), require("tailwindcss-debug-screens")],
};
