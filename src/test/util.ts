import { noop } from 'lodash-es';
import { Appender } from '..';
import { LogLevel } from '../log-level';

export function spyOnConsoleMethods() {
    return {
        error: jest.spyOn(console, 'error').mockImplementation(noop),
        warn: jest.spyOn(console, 'warn').mockImplementation(noop),
        log: jest.spyOn(console, 'log').mockImplementation(noop),
        info: jest.spyOn(console, 'info').mockImplementation(noop),
        debug: jest.spyOn(console, 'debug').mockImplementation(noop),
        trace: jest.spyOn(console, 'trace').mockImplementation(noop)
    };
}

export function spyOnFetch() {
    const spy = jest.spyOn(window, 'fetch');
    spy.mockReturnValue(Promise.resolve());
    spy.mockClear();
    return spy;
}

export function createMockAppender(): Appender {
    return {
        logLevel: LogLevel.Info,
        onPublishLogMessage: jest.fn(),
        setLogLevel: jest.fn()
    };
}