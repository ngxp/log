import { Logger } from '.';
import { LogManager } from '../log-manager';
import { childLoggerName, childLoggerSimpleName, grandChildLoggerName, grandChildLoggerSimpleName, rootLoggerName, rootLoggerSimpleName } from '../test';
import { getLoggerName, isValidSimpleName } from './logger-name';

describe('loggerName', () => {
    let rootLogger: Logger;
    let childLogger: Logger;
    let grandChildLogger: Logger;

    beforeEach(() => {
        const logManager = new LogManager();
        rootLogger = logManager.getLogger();
        childLogger = rootLogger.getLogger(childLoggerSimpleName);
        grandChildLogger = childLogger.getLogger(grandChildLoggerSimpleName);

    });

    describe('getLoggerName', () => {
        it('builds the name from the given simple name and the full name of the parent logger', () => {
            expect(getLoggerName(childLoggerSimpleName, rootLogger)).toBe(childLoggerName);
            expect(getLoggerName(grandChildLoggerSimpleName, childLogger)).toBe(grandChildLoggerName);
        });

        it('returns the given simple name if no parent is given', () => {
            expect(rootLoggerSimpleName).toBe(rootLoggerName);
            expect(getLoggerName(rootLoggerSimpleName, null)).toBe(rootLoggerName);
        });
    });

    describe('isValidSimpleName', () => {
        it('returns true if the name does not contain the separator character', () => {
            expect(isValidSimpleName(rootLoggerSimpleName)).toBe(true);
            expect(isValidSimpleName(childLoggerSimpleName)).toBe(true);
            expect(isValidSimpleName(grandChildLoggerSimpleName)).toBe(true);
        });

        it('returns false if the name contains the separator character', () => {
            expect(isValidSimpleName(childLoggerName)).toBe(false);
            expect(isValidSimpleName(grandChildLoggerName)).toBe(false);
        });
    });

});
