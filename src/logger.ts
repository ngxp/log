import { startsWith } from 'lodash';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Appender, AppenderSubscriptionManager } from './appender';
import { isEqualOrHigher, LogLevel } from './log-level';
import { LogManager } from './log-manager';
import { LogMessage } from './log-message';

export type LogFn = (message: string) => void;

export interface Logger {
    name: string;
    parent: Logger | null;

    error(message: string): void;
    warn(message: string): void;
    log(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    trace(message: string): void;

    setLogLevel(logLevel: LogLevel): this;

    registerAppender(appender: Appender): this;
    unregisterAppender(appender: Appender): void;

    getLogger(simpleName: string): Logger;
}

export function createRootLogger(name: string, logManager: LogManager) {
    return new ManagedLogger(name, null, logManager);
}

export function createChildLogger(name: string, parent: Logger, logManager: LogManager) {
    return new ManagedLogger(name, parent, logManager);
}

class ManagedLogger implements Logger {

    error: LogFn;
    warn: LogFn;
    log: LogFn;
    info: LogFn;
    debug: LogFn;
    trace: LogFn;

    private logLevel = LogLevel.Log;
    private appenderSubscriptions = new AppenderSubscriptionManager();

    constructor(
        public readonly name: string,
        public readonly parent: Logger | null,
        private logManager: LogManager
    ) {
        const createLogFn = createLogFnFactory(this.name, this.logManager.logMessage$);

        this.error = createLogFn(LogLevel.Error);
        this.warn = createLogFn(LogLevel.Warn);
        this.log = createLogFn(LogLevel.Log);
        this.info = createLogFn(LogLevel.Info);
        this.debug = createLogFn(LogLevel.Debug);
        this.trace = createLogFn(LogLevel.Trace);
    }

    getLogger(simpleName: string): Logger {
        return this.logManager.getOrCreateLogger(
            getLoggerName(simpleName, this),
            this
        );
    }

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
        return this;
    }

    registerAppender(appender: Appender) {
        const subscription = this.logManager.logMessage$.pipe(
            filter(logMessage => startsWith(logMessage.loggerName, this.name)),
            filter(logMessage => isEqualOrHigher(this.logLevel, logMessage.level))
        )
            .subscribe(message => appender.onPublishLogMessage(message));

        this.appenderSubscriptions.add(appender, subscription);

        return this;
    }

    unregisterAppender(appender: Appender) {
        this.appenderSubscriptions.remove(appender);
    }
}

function getLoggerName(simpleName: string, parent: Logger) {
    return [
        parent.name,
        simpleName
    ]
        .join('.');
}

function createLogFnFactory(name: string, logMessages$: Subject<LogMessage>): (level: LogLevel) => LogFn {
    return (level: LogLevel) => (message: string) => logMessages$.next({ level, loggerName: name, message });
}
