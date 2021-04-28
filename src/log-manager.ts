import { isUndefined } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { LogMessage } from './log-message';
import { createChildLogger, createRootLogger, Logger } from './logger';
import { getLoggerName } from './logger/logger-name';

const ROOT_LOGGER_NAME = '';

export class LogManager {

    public readonly logMessage$: Observable<LogMessage>;

    private readonly log$ = new Subject<LogMessage>();

    private loggers: { [key: string]: Logger } = {};

    constructor() {
        this.logMessage$ = this.log$.asObservable();
        this.addLogger(createRootLogger(ROOT_LOGGER_NAME, this));
    }

    getLogger(name: string = ROOT_LOGGER_NAME): Logger {
        return this.loggers[name];
    }

    getOrCreateLogger(simpleName: string, parent: Logger): Logger {
        const name = getLoggerName(simpleName, parent);
        let logger = this.getLogger(name);

        if (isUndefined(logger)) {
            logger = this.createChildLogger(simpleName, parent);
        }

        return logger;
    }

    publishLogMessage(logMessage: LogMessage) {
        this.log$.next(logMessage);
    }

    private createChildLogger(simpleName: string, parent: Logger): Logger {
        const logger = createChildLogger(simpleName, parent, this);
        this.addLogger(logger);
        return logger;
    }

    private addLogger(logger: Logger) {
        this.loggers = {
            ...this.loggers,
            [logger.name]: logger
        };
    }
}
