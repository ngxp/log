import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Appender } from '.';
import { isEqualOrHigher, LogLevel } from '../log-level';
import { LogMessage } from '../log-message';

export abstract class BaseAppender implements Appender {

    public get logLevel() {
        return this.level;
    }

    protected logMessage$: Observable<LogMessage>;
    private level = LogLevel.Trace;

    private unfilteredLog$ = new Subject<LogMessage>();

    constructor() {
        this.logMessage$ = this.unfilteredLog$.pipe(
            filter(logMessage => isEqualOrHigher(this.level, logMessage.level))
        );
    }

    onPublishLogMessage(logMessage: LogMessage) {
        this.unfilteredLog$.next(logMessage);
    }

    setLogLevel(logLevel: LogLevel) {
        this.level = logLevel;
        return this;
    }
}
