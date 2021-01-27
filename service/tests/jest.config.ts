import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: ['js', 'ts'],
    resetMocks: true,
    clearMocks: true,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    globalSetup: '<rootDir>/setup.ts',
    globalTeardown: '<rootDir>/teardown.ts',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: [
        '**/*.test.ts',
    ],
    testEnvironment: 'node',
};
export default config;
