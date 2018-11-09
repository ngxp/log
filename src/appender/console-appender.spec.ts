import { Appender } from '.';
import { debugMessage, errorMessage, infoMessage, logMessage, spyOnConsoleMethods, traceMessage, warnMessage } from '../test';
import { ConsoleAppender } from './console-appender';

describe('ConsoleAppender', () => {
    let appender: Appender;

    beforeEach(() => {
        spyOnConsoleMethods();
        appender = new ConsoleAppender();
    });

    describe('onPublishLogMessage', () => {
        it('outputs the message to the console using the console method corresponding to the log level of the message', () => {
            appender.onPublishLogMessage(errorMessage);
            appender.onPublishLogMessage(warnMessage);
            appender.onPublishLogMessage(logMessage);
            appender.onPublishLogMessage(infoMessage);
            appender.onPublishLogMessage(debugMessage);
            appender.onPublishLogMessage(traceMessage);

            // tslint:disable:no-console
            expect(console.error).toHaveBeenCalledWith(errorMessage.message);
            expect(console.warn).toHaveBeenCalledWith(warnMessage.message);
            expect(console.log).toHaveBeenCalledWith(logMessage.message);
            expect(console.info).toHaveBeenCalledWith(infoMessage.message);
            expect(console.debug).toHaveBeenCalledWith(debugMessage.message);
            expect(console.trace).toHaveBeenCalledWith(traceMessage.message);
        });
    });
});
