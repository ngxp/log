import { LogLevel } from './log-level';

export interface LogMessage {
    timestamp: string;
    level: LogLevel;
    loggerName: string;
    message: string;
}
