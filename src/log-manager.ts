import { isUndefined } from 'lodash-es';
import { Subject } from 'rxjs';
import { LogMessage } from './log-message';
import { createChildLogger, createRootLogger, Logger } from './logger';

const ROOT_LOGGER_NAME = '';

export class LogManager {

    public readonly logMessage$ = new Subject<LogMessage>();

    private loggers: { [key: string]: Logger } = {};

    constructor() {
        this.addLogger(createRootLogger(ROOT_LOGGER_NAME, this));
    }

    getLogger(name: string = ROOT_LOGGER_NAME): Logger {
        return this.loggers[name];
    }

    getOrCreateLogger(name: string, parent: Logger): Logger {
        let logger = this.getLogger(name);

        if (isUndefined(logger)) {
            logger = this.createChildLogger(name, parent);
        }

        return logger;
    }

    private createChildLogger(name: string, parent: Logger): Logger {
        const logger = createChildLogger(name, parent, this);
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
