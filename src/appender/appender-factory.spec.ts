import { consoleAppender } from '.';
import { LogLevel } from '../log-level';
import { serverLogConfig } from '../test';
import { createConsoleAppender, createServerLogAppender } from './appender-factory';
import { ConsoleAppender } from './console-appender';
import { ServerLogAppender } from './server-log';

describe('appenderFactory', () => {
    const expectedLogLevel = LogLevel.Error;

    describe('createConsoleAppender', () => {
        it('creates a new console appender with the given log level if specified', () => {
            const appender = createConsoleAppender(expectedLogLevel);

            expect(appender).toBeInstanceOf(ConsoleAppender);
            expect(appender.logLevel).toBe(expectedLogLevel);
        });

        it('creates a new console appender with a default log level of TRACE if not specified otherwise', () => {
            const appender = createConsoleAppender();

            expect(appender).toBeInstanceOf(ConsoleAppender);
            expect(appender.logLevel).toBe(LogLevel.Trace);
        });
    });

    describe('createServerLogAppender', () => {
        it('creates a new server log appender with the given log level if specified', () => {
            const appender = createServerLogAppender(serverLogConfig, expectedLogLevel);

            expect(appender).toBeInstanceOf(ServerLogAppender);
            expect(appender.logLevel).toBe(expectedLogLevel);
        });

        it('creates a new server log appender with a default log level of TRACE if not specified otherwise', () => {
            const appender = createServerLogAppender(serverLogConfig);

            expect(appender).toBeInstanceOf(ServerLogAppender);
            expect(appender.logLevel).toBe(LogLevel.Trace);
        });
    });

    describe('consoleAppender', () => {
        it('is a preconfigured console appender instance', () => {
            expect(consoleAppender).toBeInstanceOf(ConsoleAppender);
        });
    });
});
