import { LogManager } from './log-manager';

const defaultLogManager = new LogManager();

export function getLogger(name?: string) {
    return defaultLogManager.getLogger(name);
}
