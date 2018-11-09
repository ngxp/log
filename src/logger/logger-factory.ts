import { Logger } from '.';
import { LogManager } from '../log-manager';
import { getLoggerName, isValidSimpleName } from './logger-name';
import { ManagedLogger } from './managed-logger';

export function createRootLogger(simpleName: string, logManager: LogManager): Logger {
    return createLogger(simpleName, null, logManager);
}

export function createChildLogger(simpleName: string, parent: Logger, logManager: LogManager): Logger {
    return createLogger(simpleName, parent, logManager);
}

function createLogger(simpleName: string, parent: Logger | null, logManager: LogManager): Logger {
    if (!isValidSimpleName(simpleName)) {
        throw new Error(`<${simpleName}> is not a valid logger name.`);
    }

    const name = getLoggerName(simpleName, parent);

    return new ManagedLogger(name, parent, logManager);
}
