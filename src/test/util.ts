import { noop } from 'lodash-es';
import { Appender } from '..';
import * as date from '../date';
import { LogLevel } from '../log-level';
import { timestamp } from './data';

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
    spy.mockReturnValue(Promise.resolve<any>(undefined));
    spy.mockClear();
    return spy;
}

export function spyOnLocalStorage() {
    return spyOnStorage(window.localStorage);
}

export function spyOnSessionStorage() {
    return spyOnStorage(window.sessionStorage);
}

export function mockTimestamp() {
    jest.spyOn(date, 'getTimestamp').mockReturnValue(timestamp);
}

export function createMockAppender(): Appender {
    return {
        logLevel: LogLevel.Info,
        onPublishLogMessage: jest.fn(),
        setLogLevel: jest.fn()
    };
}

function spyOnStorage(storage: Storage) {
    const spy = jest.spyOn(storage, 'setItem');
    spy.mockClear();
    storage.clear();
    return spy;
}
