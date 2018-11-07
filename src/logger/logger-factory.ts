import { Logger } from '.';
import { LogManager } from '../log-manager';
import { ManagedLogger } from './managed-logger';

export function createRootLogger(name: string, logManager: LogManager): Logger {
    return new ManagedLogger(name, null, logManager);
}

export function createChildLogger(name: string, parent: Logger, logManager: LogManager): Logger {
    return new ManagedLogger(name, parent, logManager);
}
