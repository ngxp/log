import { Logger } from '.';
import { LogManager } from '../log-manager';
import { childLoggerSimpleName, grandChildLoggerName, grandChildLoggerSimpleName, rootLoggerName, rootLoggerSimpleName } from '../test';
import { createChildLogger, createRootLogger } from './logger-factory';
import { ManagedLogger } from './managed-logger';

describe('loggerFactory', () => {
    let logManager: LogManager;
    let rootLogger: Logger;
    let childLogger: Logger;

    beforeEach(() => {
        logManager = new LogManager();
        rootLogger = logManager.getLogger();
        childLogger = rootLogger.getLogger(childLoggerSimpleName);
    });

    describe('createRootLogger', () => {
        it('returns a ManagedLogger instance configured as a root logger', () => {
            const logger = createRootLogger(rootLoggerSimpleName, logManager);

            expect(logger).toBeInstanceOf(ManagedLogger);
            expect(logger.name).toBe(rootLoggerName);
            expect(logger.parent).toBeNull();
        });

        it('throws an error if an invalid name is given', () => {
            expect(() => createRootLogger('invalid.name', logManager)).toThrowError();
        });
    });

    describe('createChildLogger', () => {
        it('returns a ManagedLogger instance configured as a child logger', () => {
            const logger = createChildLogger(grandChildLoggerSimpleName, childLogger, logManager);

            expect(logger).toBeInstanceOf(ManagedLogger);
            expect(logger.name).toBe(grandChildLoggerName);
            expect(logger.parent).toBe(childLogger);
        });

        it('throws an error if an invalid name is given', () => {
            expect(() => createChildLogger('invalid.name', childLogger, logManager)).toThrowError();
        });
    });
});
