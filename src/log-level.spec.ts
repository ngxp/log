import { isEqualOrHigher, LogLevel } from '.';

describe('logLevels', () => {
    describe('isEqualOrHigher', () => {
        it('returns whether the given log level is equal or higher than the min log level', () => {
            const minLogLevel = LogLevel.Info;

            expect(isEqualOrHigher(minLogLevel, LogLevel.Error)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Warn)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Log)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Info)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Debug)).toBe(false);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Trace)).toBe(false);
        });

        it('returns true only for Error when minLogLevel is Error', () => {
            const minLogLevel = LogLevel.Error;

            expect(isEqualOrHigher(minLogLevel, LogLevel.Error)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Warn)).toBe(false);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Log)).toBe(false);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Info)).toBe(false);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Debug)).toBe(false);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Trace)).toBe(false);
        });

        it('returns true for all log levels when minLogLevel is Trace', () => {
            const minLogLevel = LogLevel.Trace;

            expect(isEqualOrHigher(minLogLevel, LogLevel.Error)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Warn)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Log)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Info)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Debug)).toBe(true);
            expect(isEqualOrHigher(minLogLevel, LogLevel.Trace)).toBe(true);
        });
    });
});
