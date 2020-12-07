module.exports = {
    root: true,
    extends: [
        // Default recommended rules
        "eslint:recommended",

        // Recommended rules from @typescript-eslint/eslint-plugin
        "plugin:@typescript-eslint/recommended",

        // Recommended rules from eslint-plugin-react
        "plugin:react/recommended",

        // Recommneded React hooks rules
        "plugin:react-hooks/recommended",

        // Recommended accessibility rules
        // See https://developer.mozilla.org/en-US/docs/Web/Accessibility to understand A11y
        // Also ee https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
        "plugin:jsx-a11y/recommended",

        // Turn off Typescript rules that would conflict with prettier
        // See https://github.com/prettier/eslint-plugin-prettier
        "prettier/@typescript-eslint",

        // Recommneded rules from eslint-plugin-prettier
        // Modify the final formatting rules based on prettier
        "plugin:prettier/recommended",
    ],

    // allows eslint to parse Typescript code.
    // Use @typescript-eslint/parser in conjunction with @typescript-eslint/eslint-plugin
    // See https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    parser: "@typescript-eslint/parser",

    // Ignore generated files like node_modules
    ignorePatterns: ["node_modules/*", ".next/*", ".out/*"],

    // Enable global variables for browser, node, and ES6
    env: {
        es6: true,
        browser: true,
        node: true,
    },

    parserOptions: {
        // Allows for the use of imports
        sourceType: "module",

        // Enable modern ECMA script features
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true, // Parse JSX
        },
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-var-requires": "off",
        "class-methods-use-this": "off",
        "comma-dangle": "off",
        "function-paren-newline": "off",
        "global-require": "off",

        // This rule is not compatible with Next.js's <Link /> components
        "jsx-a11y/anchor-is-valid": "off",
        "no-inner-declarations": "off",

        // Turn off default no-unused-vars rule and use Typescript version instead
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",

        // See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
        // Use Record<string, unknown> instead of object
        "@typescript-eslint/ban-types": "error",
    },
};
