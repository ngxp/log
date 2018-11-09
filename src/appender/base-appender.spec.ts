import { Appender } from '.';
import { LogLevel } from '../log-level';
import { errorMessage, logMessage, traceMessage } from '../test';
import { BaseAppender } from './base-appender';

describe('BaseAppender', () => {
    let appender: Appender;
    let logMessageSpy: jest.Mock;

    class TestAppender extends BaseAppender {
        constructor() {
            super();
            this.logMessage$.subscribe(message => logMessageSpy(message));
        }
    }

    beforeEach(() => {
        appender = new TestAppender();
        logMessageSpy = jest.fn();
    });

    describe('onPublishLogMessage', () => {
        it('publishes the log message into the logMessage$ stream', () => {
            appender.onPublishLogMessage(logMessage);

            expect(logMessageSpy).toHaveBeenCalledWith(logMessage);
        });
    });

    describe('setLogLevel', () => {
        it('filters messages from the logMessage$ stream that do not match the configured log level', () => {
            const expectedLogLevel = LogLevel.Info;
            appender.setLogLevel(expectedLogLevel);
            appender.onPublishLogMessage(traceMessage);
            appender.onPublishLogMessage(errorMessage);

            expect(appender.logLevel).toBe(expectedLogLevel);
            expect(logMessageSpy).toHaveBeenCalledTimes(1);
            expect(logMessageSpy).toHaveBeenCalledWith(errorMessage);
        });
    });

});
