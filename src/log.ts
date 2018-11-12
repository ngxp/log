import { LogManager } from './log-manager';
import { Logger } from './logger';

const defaultLogManager = new LogManager();

export function getLogger(name?: string): Logger {
    return defaultLogManager.getLogger(name);
}

export const { error, warn, log, info, debug, trace } = getLogger();
