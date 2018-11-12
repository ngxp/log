import { Appender } from '.';
import { debugMessage, errorMessage, infoMessage, logMessage, spyOnConsoleMethods, traceMessage, warnMessage } from '../test';
import { ConsoleAppender } from './console-appender';
import { format } from './message-formatter';

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
            expect(console.error).toHaveBeenCalledWith(format(errorMessage));
            expect(console.warn).toHaveBeenCalledWith(format(warnMessage));
            expect(console.log).toHaveBeenCalledWith(format(logMessage));
            expect(console.info).toHaveBeenCalledWith(format(infoMessage));
            expect(console.debug).toHaveBeenCalledWith(format(debugMessage));
            expect(console.trace).toHaveBeenCalledWith(format(traceMessage));
        });
    });
});
