import { take } from 'rxjs/operators';
import { LogManager } from './log-manager';
import { getLoggerName } from './logger/logger-name';
import { childLoggerSimpleName, logMessage, rootLoggerSimpleName } from './test';

describe('LogManager', () => {
    let logManager: LogManager;

    beforeEach(() => {
        logManager = new LogManager();
    });

    describe('publishLogMessage', () => {
        it('publishes a log message', done => {
            logManager.logMessage$.pipe(take(1))
                .subscribe(message => {
                    expect(message).toBe(logMessage);
                    done();
                });

            logManager.publishLogMessage(logMessage);
        });
    });

    describe('getLogger', () => {
        it('returns the root logger if no name is given', () => {
            const rootLogger = logManager.getLogger();

            expect(rootLogger.name).toBe(rootLoggerSimpleName);
            expect(rootLogger.parent).toBeNull();
        });

        it('returns the logger with the given name', () => {
            const rootLogger = logManager.getLogger();
            const expectedChildLogger = rootLogger.getLogger(childLoggerSimpleName);

            const childLogger = logManager.getLogger(expectedChildLogger.name);

            expect(childLogger).toBe(expectedChildLogger);
        });

        it('returns undefined if no logger with the given name exists', () => {
            const rootLogger = logManager.getLogger('invalid');

            expect(rootLogger).toBeUndefined();
        });
    });

    describe('getOrCreateLogger', () => {
        it('returns the logger with the given name if it exists', () => {
            const rootLogger = logManager.getLogger();
            const expectedChildLogger = logManager.getOrCreateLogger(childLoggerSimpleName, rootLogger);

            const childLogger = logManager.getOrCreateLogger(childLoggerSimpleName, rootLogger);

            expect(childLogger).toBe(expectedChildLogger);
        });

        it('creates a new child logger if no logger with the given name exists for that parent', () => {
            const rootLogger = logManager.getLogger();
            const childLoggerName = getLoggerName(childLoggerSimpleName, rootLogger);

            expect(logManager.getLogger(childLoggerName)).toBeUndefined();

            logManager.getOrCreateLogger(childLoggerSimpleName, rootLogger);

            const childLogger = logManager.getLogger(childLoggerName);
            expect(childLogger).not.toBeUndefined();
            expect(childLogger.name).toBe(childLoggerName);
            expect(childLogger.parent).toBe(rootLogger);
        });
    });

});
