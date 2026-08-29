type Logger = {
    error: (msg: unknown, ...args: unknown[]) => void;
};
interface HandleDatabaseErrorOptions {
    rethrowNotFound?: boolean;
    context?: string;
}
export declare function handleDatabaseError(logger: Logger, methodName: string, error: unknown, options?: HandleDatabaseErrorOptions): never;
export declare function handleDatabaseErrorOld(logger: {
    error: (msg: string, ...args: unknown[]) => void;
}, methodName: string, error: unknown): never;
export {};
