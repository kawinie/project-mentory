const colors = require("tailwindcss/colors");
colors.primary = colors.black;
colors.secondary = colors.gray[500];

module.exports = {
    purgecss: {
        content: [
            "./pages/**/*.tsx",
            "./pages/**/*.html",
            "./components/**/*.tsx",
            "./layouts/**/*.tsx",
        ],
    },
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
    plugins: [require("@tailwindcss/custom-forms"), require("tailwindcss-debug-screens")],
    screen: {
        "2xl": false,
    },
};
