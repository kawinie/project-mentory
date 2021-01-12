const micromatch = require("micromatch");

module.exports = {
    "**/*.{ts,tsx,js,jsx}": (names) => {
        const tsFiles = micromatch.match(names, "*.{ts,tsx}");
        return tsFiles
            .map((f) => `tsc -p tsconfig.json --pretty --noEmit ${f}`)
            .concat([`eslint ${names.join(" ")}`]);
    },
};
