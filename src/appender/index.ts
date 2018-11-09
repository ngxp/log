import { LogLevel } from '../log-level';
import { LogMessage } from '../log-message';

export * from './appender-factory';
export { AppenderSubscriptionManager } from './appender-subscription';
export { BodyBuilder, ServerLogConfig, ServerLogConfigFactory } from './server-log';

export interface Appender {
    readonly logLevel: LogLevel;
    onPublishLogMessage(logMessage: LogMessage): void;
    setLogLevel(logLevel: LogLevel): this;
}
