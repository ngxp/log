import { isUndefined } from 'lodash-es';
import { createChildLogger, createRootLogger, getLoggerName, Logger, ROOT_LOGGER_NAME } from './logger';

export class LogManager {

    private loggers: { [key: string]: Logger } = {};

    constructor() {
        this.addLogger(createRootLogger(this));
    }

    getOrCreateLogger(simpleName: string, parent: Logger): Logger {
        let logger = this.getLogger(getLoggerName(simpleName, parent));

        if (isUndefined(logger)) {
            logger = this.createChildLogger(simpleName, parent);
        }

        return logger;
    }

    getLogger(name: string = ROOT_LOGGER_NAME): Logger {
        return this.loggers[name];
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
