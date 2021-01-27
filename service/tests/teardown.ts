export default async (): Promise<void> => {
    await (global as any).__MONGO__.stop();
};
