import { LogLevel } from './log-level';

export interface LogMessage {
    level: LogLevel;
    loggerName: string;
    message: string;
}
