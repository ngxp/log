import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Appender } from '.';
import { isEqualOrHigher, LogLevel } from '../log-level';
import { LogMessage } from '../log-message';

export abstract class BaseAppender implements Appender {

    protected logMessage$: Observable<LogMessage>;
    protected logLevel = LogLevel.Trace;

    private unfilteredLog$ = new Subject<LogMessage>();

    constructor() {
        this.logMessage$ = this.unfilteredLog$.pipe(
            filter(logMessage => isEqualOrHigher(this.logLevel, logMessage.level))
        );
    }

    onPublishLogMessage(logMessage: LogMessage) {
        this.unfilteredLog$.next(logMessage);
    }

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
        return this;
    }
}
