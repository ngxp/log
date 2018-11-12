import { LogMessage } from '../../log-message';
import { grandChildLoggerName, logMessage, rootLoggerName } from '../../test';
import { defaultBodyBuilder } from './body-builder';

describe('bodyBuilder', () => {
    describe('defaultBodyBuilder', () => {
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

        it('stringifies the array of log messages', () => {
            expect(defaultBodyBuilder([rootMessage, childMessage])).toBe(JSON.stringify([
                { level: rootMessage.level, message: expectedRootMessage },
                { level: childMessage.level, message: expectedChildMessage }
            ]));
        });

        it('formats a log message from a root logger without  the logger name', () => {
            expect(defaultBodyBuilder([rootMessage])).toBe(JSON.stringify([{
                level: rootMessage.level,
                message: expectedRootMessage
            }]));
        });

        it('formats a log message from a child logger with the logger name', () => {
            expect(defaultBodyBuilder([childMessage])).toBe(JSON.stringify([{
                level: childMessage.level,
                message: expectedChildMessage
            }]));
        });
    });
});
