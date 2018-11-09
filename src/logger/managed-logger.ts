import { startsWith } from 'lodash-es';
import { filter } from 'rxjs/operators';
import { Logger } from '.';
import { Appender, AppenderSubscriptionManager } from '../appender';
import { isEqualOrHigher, LogLevel } from '../log-level';
import { LogManager } from '../log-manager';
import { LogMessage } from '../log-message';

type LogFn = (message: string) => void;
type PublishLogMessageFn = (message: LogMessage) => void;

export class ManagedLogger implements Logger {

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
        const createLogFn = createLogFnFactory(
            this.name,
            logMessage => this.logManager.publishLogMessage(logMessage)
        );

        this.error = createLogFn(LogLevel.Error);
        this.warn = createLogFn(LogLevel.Warn);
        this.log = createLogFn(LogLevel.Log);
        this.info = createLogFn(LogLevel.Info);
        this.debug = createLogFn(LogLevel.Debug);
        this.trace = createLogFn(LogLevel.Trace);
    }

    getLogger(simpleName: string): Logger {
        return this.logManager.getOrCreateLogger(
            simpleName,
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

function createLogFnFactory(name: string, publishLogMessage: PublishLogMessageFn): (level: LogLevel) => LogFn {
    return (level: LogLevel) => (message: string) => publishLogMessage({ level, loggerName: name, message });
}
