/** @type {import('jest').Config} */
export default {
    // Jest configuration for ES modules
    transform: {
        '^.+\\.js$': ['babel-jest', { configFile: './babel.config.json' }]
    },
    
    // Coverage settings
    collectCoverage: true,
    collectCoverageFrom: [
        'api/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text', 'lcov', 'clover'],
    
    // Test environment settings
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)'
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    
    // Module handling
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    
    // General settings
    clearMocks: true,
    verbose: true,
    
    // Module settings
    moduleFileExtensions: ['js', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!(dotenv)/)'
    ]
};