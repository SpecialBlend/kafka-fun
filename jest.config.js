module.exports = {
    collectCoverageFrom: [
        '**/*.js',
        '**/*.jsx',
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/coverage/',
        '<rootDir>/scripts',
        '<rootDir>/jest.config.js',
        '<rootDir>/webpack.config.js',
    ],
    globalSetup: './__mocks__/setup-test-environment.js',
    setupFilesAfterEnv: ['./__mocks__/setup-test-framework.js'],
    testEnvironment: 'node',
};
