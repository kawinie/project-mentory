const colors = require("tailwindcss/colors");

module.exports = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            // Enable all Tailwind color utilities
            colors: colors,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    screen: {
        "2xl": false,
    },
};
