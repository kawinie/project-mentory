// next.config.js

// NextJS bundle analyzer allows us to see how the impact of our packages on the bundle size
// Usage: ANALYZE=true npm run build
// More info at https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    webpack: (config, { isServer }) => {
        // Some npm packages work in both client and server environment. This forcefully disables fs module to get rid of error on client build.
        if (!isServer) {
            config.node = { fs: "empty" };
        }

        // GraphQL loader to load .gql or .graphql files
        // More info at https://www.apollographql.com/docs/react/integrations/webpack/
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader",
        });

        return config;
    },
    images: {
        domains: [
            "localhost",
            "https://floating-dusk-99867.herokuapp.com",
            "https://mentorystrapimedia.s3.us-west-2.amazonaws.com",
        ],
    },

    // This is how to do redirections
    async redirects() {
        return [
            { source: "/users/:username", destination: "/users/:username/about", permanent: true },
        ];
    },
});
