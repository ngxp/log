import { Appender, consoleAppender, createConsoleAppender, getLogger, LogLevel } from '.';
import { createWebStorageLogAppender } from './appender';
import { createMockAppender, debugMessage, errorMessage, infoMessage, logMessage, mockTimestamp, spyOnConsoleMethods, spyOnSessionStorage, timestamp, traceMessage, warnMessage, webStorageLogConfig } from './test';

// tslint:disable:no-console

describe('@ngxp/log', () => {
    let mockAppender: Appender;

    beforeEach(() => {
        spyOnSessionStorage();
        spyOnConsoleMethods();
        mockAppender = createMockAppender();
        mockTimestamp();
    });

    it('integration test', () => {
        const customConsoleAppender = createConsoleAppender(LogLevel.Info);
        const webStorageLogAppender = createWebStorageLogAppender(webStorageLogConfig, LogLevel.Error);

        const logger = getLogger()
            .setLogLevel(LogLevel.Trace)
            .registerAppender(customConsoleAppender);

        const { error, info } = logger;

        const libLogger = logger.getLogger('myLib')
            .setLogLevel(LogLevel.Warn)
            .registerAppender(consoleAppender)
            .registerAppender(webStorageLogAppender);

        const { error: libError, info: libInfo } = libLogger;

        error('root error');
        info('root info');
        libError('lib error');
        libInfo('lib info');

        expect(console.error).toHaveBeenCalledTimes(3);
        expect(console.error).toHaveBeenNthCalledWith(1, `${timestamp} root error`);
        expect(console.error).toHaveBeenNthCalledWith(2, `${timestamp} myLib lib error`);
        expect(console.error).toHaveBeenNthCalledWith(3, `${timestamp} myLib lib error`);
        expect(console.info).toHaveBeenCalledTimes(2);
        expect(console.info).toHaveBeenNthCalledWith(1, `${timestamp} root info`);
        expect(console.info).toHaveBeenNthCalledWith(2, `${timestamp} myLib lib info`);
        expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
        expect(window.sessionStorage.setItem).toHaveBeenNthCalledWith(1, webStorageLogConfig.storageItemKey, JSON.stringify([{
            loggerName: '.myLib',
            timestamp,
            level: LogLevel.Error,
            message: 'lib error'
        }]));
    });

    it('exposes the log methods as functions', () => {
        const logger = getLogger()
            .registerAppender(mockAppender)
            .setLogLevel(LogLevel.Trace);

        logger.error(errorMessage.message);
        logger.warn(warnMessage.message);
        logger.log(logMessage.message);
        logger.info(infoMessage.message);
        logger.debug(debugMessage.message);
        logger.trace(traceMessage.message);

        // tslint:disable:no-magic-numbers
        expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(1, errorMessage);
        expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(2, warnMessage);
        expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(3, logMessage);
        expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(4, infoMessage);
        expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(5, debugMessage);
        expect(mockAppender.onPublishLogMessage).toHaveBeenNthCalledWith(6, traceMessage);
    });
});
