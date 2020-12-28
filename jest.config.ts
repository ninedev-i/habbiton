import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    roots: ['src'],
    moduleFileExtensions: ['js', 'tsx', 'ts'],
    moduleNameMapper: {
        // eslint-disable-next-line max-len
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.ts',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
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
