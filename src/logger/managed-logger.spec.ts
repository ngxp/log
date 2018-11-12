import { Logger } from '.';
import { Appender } from '../appender';
import { LogLevel, logLevels } from '../log-level';
import { LogManager } from '../log-manager';
import { LogMessage } from '../log-message';
import { childLoggerSimpleName, createMockAppender, debugMessage, errorMessage, grandChildLoggerSimpleName, infoMessage, logMessage, logMessagesByLevel, mockTimestamp, rootLoggerSimpleName, traceMessage, warnMessage } from '../test';
import { getLoggerName } from './logger-name';
import { ManagedLogger } from './managed-logger';

describe('ManagedLogger', () => {
    let logManager: LogManager;
    let rootLogger: ManagedLogger;
    let childLogger: Logger;
    let grandChildLogger: Logger;
    let mockAppender: Appender;

    beforeEach(() => {
        logManager = new LogManager();
        rootLogger = new ManagedLogger(rootLoggerSimpleName, null, logManager);
        childLogger = rootLogger.getLogger(childLoggerSimpleName);
        grandChildLogger = childLogger.getLogger(grandChildLoggerSimpleName);
        mockAppender = createMockAppender();
        mockTimestamp();
    });

    logLevels.forEach(logMethod => {
        describe(logMethod, () => {
            it(`publishes a ${logMethod} message`, () => {
                spyOn(logManager, 'publishLogMessage');

                const expectedLogMessage = logMessagesByLevel[logMethod];

                rootLogger[logMethod](expectedLogMessage.message);

                expect(logManager.publishLogMessage).toHaveBeenCalledWith(expectedLogMessage);
            });
        });
    });

    describe('getLogger', () => {
        beforeEach(() => {
            jest.spyOn(logManager, 'getOrCreateLogger');
        });

        it('returns the child logger with the given name', () => {
            const logger = rootLogger.getLogger(childLoggerSimpleName);

            expect(logger).toBe(childLogger);
        });

        it('creates a new logger if no child logger with the given name exists', () => {
            const simpleName = 'child2';
            const logger = rootLogger.getLogger(simpleName);

            expect(logger.name).toBe(getLoggerName(simpleName, rootLogger));
            expect(logger.parent).toBe(rootLogger);
        });
    });

    describe('setLogLevel', () => {
        it('sets the log level for the log messages passed to registered appenders', () => {
            rootLogger.registerAppender(mockAppender);

            rootLogger.setLogLevel(LogLevel.Info);

            rootLogger.error(errorMessage.message);
            rootLogger.trace(traceMessage.message);

            expect(mockAppender.onPublishLogMessage).toHaveBeenCalledTimes(1);
            expect(mockAppender.onPublishLogMessage).toHaveBeenCalledWith(errorMessage);
        });
    });

    describe('registerAppender', () => {
        it('registers an appender that receives all published log messages that match the configured log level of the logger', () => {
            rootLogger.registerAppender(mockAppender);
            rootLogger.setLogLevel(LogLevel.Trace);

            rootLogger.error(errorMessage.message);
            rootLogger.warn(warnMessage.message);
            rootLogger.log(logMessage.message);
            rootLogger.info(infoMessage.message);
            rootLogger.debug(debugMessage.message);
            rootLogger.trace(traceMessage.message);

            // tslint:disable:no-magic-numbers
            expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(1, errorMessage);
            expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(2, warnMessage);
            expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(3, logMessage);
            expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(4, infoMessage);
            expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(5, debugMessage);
            expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(6, traceMessage);
        });

        it('only passes log messages from the logger and its child loggers to the appender', () => {
            const rootAppender = createMockAppender();
            rootLogger.registerAppender(rootAppender);

            const childAppender = createMockAppender();
            childLogger.registerAppender(childAppender);

            const grandChildAppender = createMockAppender();
            grandChildLogger.registerAppender(grandChildAppender);

            const expectedErrorMessage: LogMessage = {
                ...errorMessage,
                loggerName: childLogger.name
            };

            childLogger.error(errorMessage.message);

            expect(rootAppender.onPublishLogMessage).toHaveBeenCalledWith(expectedErrorMessage);
            expect(childAppender.onPublishLogMessage).toHaveBeenCalledWith(expectedErrorMessage);
            expect(grandChildAppender.onPublishLogMessage).not.toHaveBeenCalled();
        });
    });

    describe('unregisterAppender', () => {
        it('unregisters the given appender from the logger', () => {
            rootLogger.registerAppender(mockAppender);

            rootLogger.error(errorMessage.message);

            expect(mockAppender.onPublishLogMessage).toHaveBeenCalledTimes(1);

            rootLogger.unregisterAppender(mockAppender);

            rootLogger.error(errorMessage.message);

            expect(mockAppender.onPublishLogMessage).toHaveBeenCalledTimes(1);
        });
    });
});
