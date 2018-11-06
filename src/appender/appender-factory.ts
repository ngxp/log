import { LogLevel } from '../log-level';
import { ConsoleAppender } from './console-appender';
import { ServerLogAppender } from './server-log';
import { ServerLogConfigInit } from './server-log/server-log-config';

export function createConsoleAppender(logLevel = LogLevel.Trace): ConsoleAppender {
    const appender = new ConsoleAppender();
    appender.setLogLevel(logLevel);
    return appender;
}

export function createServerLogAppender(serverLogConfig: ServerLogConfigInit, logLevel = LogLevel.Trace, bufferTimeSpan?: number): ServerLogAppender {
    const appender = new ServerLogAppender(serverLogConfig, bufferTimeSpan);
    appender.setLogLevel(logLevel);
    return appender;
}

export const consoleAppender = createConsoleAppender();
