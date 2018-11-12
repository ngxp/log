import { LogMessage } from '..';
import { grandChildLoggerName, logMessage, rootLoggerName } from '../test';
import { format } from './message-formatter';

describe('messageFormatter', () => {
    const rootMessage: LogMessage = {
        ...logMessage,
        loggerName: rootLoggerName
    };
    const expectedRootMessage = logMessage.message;

    const childMessage: LogMessage = {
        ...logMessage,
        loggerName: grandChildLoggerName
    };
    const expectedChildMessage = `${grandChildLoggerName.substr(1)} ${logMessage.message}`;

    it('formats a log message from a root logger without the logger name', () => {
        expect(format(rootMessage)).toBe(expectedRootMessage);
    });

    it('formats a log message from a child logger with the logger name', () => {
        expect(format(childMessage)).toBe(expectedChildMessage);
    });
});
