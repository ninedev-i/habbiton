import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    roots: ['src'],
    moduleFileExtensions: ['js', 'tsx', 'ts'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|)$': '<rootDir>/__mocks__/fileMock.ts',
    },
    resetMocks: true,
    clearMocks: true,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: [
        '**/src/**/*.test.(ts|js|tsx)',
    ],
    testEnvironment: 'jsdom',
};
export default config;
