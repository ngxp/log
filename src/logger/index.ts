import { Appender } from '../appender';
import { LogLevel } from '../log-level';

export { createChildLogger, createRootLogger } from './logger-factory';

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
