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
            colors: require("tailwindcss/colors"),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/custom-forms")],
    screen: {
        "2xl": false,
    },
};
