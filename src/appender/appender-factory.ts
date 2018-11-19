import { Appender } from '.';
import { LogLevel } from '../log-level';
import { ConsoleAppender } from './console-appender';
import { ServerLogAppender } from './server-log';
import { ServerLogConfigInit } from './server-log/server-log-config';
import { WebStorageLogAppender } from './web-storage-log/web-storage-log-appender';
import { WebStorageLogConfig } from './web-storage-log/web-storage-log-config';

export function createConsoleAppender(logLevel = LogLevel.Trace): Appender {
    const appender = new ConsoleAppender();
    appender.setLogLevel(logLevel);
    return appender;
}

export function createWebStorageLogAppender(webStorageLogConfig: WebStorageLogConfig, logLevel = LogLevel.Trace): Appender {
    const appender = new WebStorageLogAppender(webStorageLogConfig);
    appender.setLogLevel(logLevel);
    return appender;
}

export function createServerLogAppender(serverLogConfig: ServerLogConfigInit, logLevel = LogLevel.Trace, bufferTimeSpan?: number): Appender {
    const appender = new ServerLogAppender(serverLogConfig, bufferTimeSpan);
    appender.setLogLevel(logLevel);
    return appender;
}

export const consoleAppender = createConsoleAppender();
