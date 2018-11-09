import { getLogger } from '.';
import { rootLoggerSimpleName } from './test';

describe('log', () => {
    describe('getLogger', () => {
        it('returns the root logger if no name is passed', () => {
            const logger = getLogger();

            expect(logger.name).toBe(rootLoggerSimpleName);
            expect(logger.parent).toBeNull();
        });

        it('returns the logger with the given name', () => {
            const childLoggerName = 'child';
            const rootLogger = getLogger();
            const expectedChildLogger = rootLogger.getLogger(childLoggerName);

            const childLogger = getLogger(expectedChildLogger.name);

            expect(childLogger).toBe(expectedChildLogger);
        });

        it('returns undefined when an invalid logger name is passed', () => {
            const childLogger = getLogger('invalid');

            expect(childLogger).toBeUndefined();
        });
    });
});
