import { debug, error, info, log, trace, warn } from './log';
import { LogLevel } from './log-levels';

const logFns: { [key: string]: (...args: any[]) => void } = {
    [LogLevel.Error]: error,
    [LogLevel.Warn]: warn,
    [LogLevel.Log]: log,
    [LogLevel.Info]: info,
    [LogLevel.Debug]: debug,
    [LogLevel.Trace]: trace
};

describe('log', () => {
    const message = 'some message';

    Object.keys(logFns).forEach(logLevel => {
        const logFn = logFns[logLevel];

        describe(logFn, () => {
            it(`logs the given message via console.${logLevel}`, () => {
                const spy = jest.spyOn(console, <LogLevel> logLevel).mockImplementation(() => undefined);

                logFn(message);

                expect(spy).toHaveBeenCalledWith(message);
            });
        });
    });
});


