import { LogManager } from './log-manager';

export type LogFn = (message: string) => void;

export interface Logger {
    name: string;
    parent: Logger | null;

    error(message: string): void;
    warn(message: string): void;
    log(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    trace(message: string): void;

    getLogger(simpleName: string): Logger;
}

export const ROOT_LOGGER_NAME = '.';

export function createRootLogger(logManager: LogManager) {
    return new ManagedLogger(ROOT_LOGGER_NAME, null, logManager);
}

export function createChildLogger(simpleName: string, parent: Logger, logManager: LogManager) {
    return new ManagedLogger(
        getLoggerName(
            simpleName,
            parent
        ),
        parent,
        logManager
    );
}

export function getLoggerName(simpleName: string, parent: Logger) {
    return [
        parent.name,
        simpleName
    ]
        .join('/');
}

class ManagedLogger implements Logger {
    constructor(
        public readonly name: string,
        public readonly parent: Logger | null,
        private logManager: LogManager
    ) { }

    error: LogFn = () => undefined;
    warn: LogFn = () => undefined;
    log: LogFn = () => undefined;
    info: LogFn = () => undefined;
    debug: LogFn = () => undefined;
    trace: LogFn = () => undefined;

    getLogger(simpleName: string): Logger {
        return this.logManager.getOrCreateLogger(simpleName, this);
    }
}
