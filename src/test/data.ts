import { BodyBuilder, LogLevel, LogMessage } from '..';
import { ServerLogConfig } from '../appender/server-log/server-log-config';

export const rootLoggerSimpleName = '';
export const rootLoggerName = '';
export const childLoggerSimpleName = 'child';
export const childLoggerName = '.child';
export const grandChildLoggerSimpleName = 'grandChild';
export const grandChildLoggerName = '.child.grandChild';

export const errorMessage: LogMessage = { level: LogLevel.Error, loggerName: rootLoggerSimpleName, message: 'some error message' };
export const warnMessage: LogMessage = { level: LogLevel.Warn, loggerName: rootLoggerSimpleName, message: 'some warn message' };
export const logMessage: LogMessage = { level: LogLevel.Log, loggerName: rootLoggerSimpleName, message: 'some log message' };
export const infoMessage: LogMessage = { level: LogLevel.Info, loggerName: rootLoggerSimpleName, message: 'some info message' };
export const debugMessage: LogMessage = { level: LogLevel.Debug, loggerName: rootLoggerSimpleName, message: 'some debug message' };
export const traceMessage: LogMessage = { level: LogLevel.Trace, loggerName: rootLoggerSimpleName, message: 'some trace message' };

export const logMessages: LogMessage[] = [
    errorMessage,
    warnMessage,
    logMessage,
    infoMessage,
    debugMessage,
    traceMessage
];

export const logMessagesByLevel = {
    [LogLevel.Error]: errorMessage,
    [LogLevel.Warn]: warnMessage,
    [LogLevel.Log]: logMessage,
    [LogLevel.Info]: infoMessage,
    [LogLevel.Debug]: debugMessage,
    [LogLevel.Trace]: traceMessage
};

export const url = 'http://example.org';
export const method = 'PUT';
export const headers = new Headers({
    'Content-Type': 'text/plain'
});
export const bodyBuilder: BodyBuilder = messages => messages
    .map(message => message.message)
    .join('\n');

export const serverLogConfig: ServerLogConfig = {
    url,
    method,
    headers,
    bodyBuilder
};

export const bufferTimeSpan = 100;