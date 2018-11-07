import { takeWhile } from 'lodash-es';

export enum LogLevel {
    Error = 'error',
    Warn = 'warn',
    Log = 'log',
    Info = 'info',
    Debug = 'debug',
    Trace = 'trace'
}

export const logLevels: LogLevel[] = [
    LogLevel.Error,
    LogLevel.Warn,
    LogLevel.Log,
    LogLevel.Info,
    LogLevel.Debug,
    LogLevel.Trace
];

export function isEqualOrHigher(minLogLevel: LogLevel, logLevel: LogLevel): boolean {
    return getAllowedLogLevels(minLogLevel).indexOf(logLevel) > -1;
}

function getAllowedLogLevels(minLogLevel: LogLevel) {
    return [
        ...takeWhile(logLevels, logLevel => logLevel !== minLogLevel),
        minLogLevel
    ];
}
