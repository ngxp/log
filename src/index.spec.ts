import { Appender, consoleAppender, createConsoleAppender, getLogger, LogLevel } from '.';
import { createMockAppender, debugMessage, errorMessage, infoMessage, logMessage, mockTimestamp, spyOnConsoleMethods, timestamp, traceMessage, warnMessage } from './test';

// tslint:disable:no-console

describe('@ngxp/log', () => {
    let mockAppender: Appender;

    beforeEach(() => {
        spyOnConsoleMethods();
        mockAppender = createMockAppender();
        mockTimestamp();
    });

    it('integration test', () => {
        const customConsoleAppender = createConsoleAppender(LogLevel.Info);

        const logger = getLogger()
            .setLogLevel(LogLevel.Trace)
            .registerAppender(customConsoleAppender);

        const { error, info } = logger;

        const libLogger = logger.getLogger('myLib')
            .setLogLevel(LogLevel.Warn)
            .registerAppender(consoleAppender);

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
