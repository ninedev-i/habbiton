import {GenericContainer, StartedTestContainer} from 'testcontainers';

export default async (): Promise<void> => {
    const PORT = 27017;
    const container: StartedTestContainer = await new GenericContainer('mongo')
        .withName('mongo_test')
        .withExposedPorts(PORT)
        .start();

    process.env.port = container.getMappedPort(PORT).toString();

    (global as any).__MONGO__ = container;
};
