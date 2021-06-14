module.exports = {
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ["/node_modules/", "/.next"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    }
};
