module.exports = {
    "*.{ts,tsx}": () => `tsc --project tsconfig.json --pretty --noEmit`,
    "*.{ts,tsx,js,jsx}": "eslint --ext .ts,.tsx,.js,.jsx",
};
