const path = require("path");

module.exports = {
	stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	webpackFinal: async (config) => {
		// If you want to add a directory to search in that takes precedence over node_modules/:
		// https://webpack.js.org/configuration/resolve/#resolvemodules
		// config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"];

		// config.module.rules.push({
		// 	test: /\.css$/i,
		// 	use: ["style-loader", "css-loader"],
		// 	include: path.resolve(__dirname, "../"),
		// });
		return config;
	},
};
