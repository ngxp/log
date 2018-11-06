import { LogMessage } from '..';

export { AppenderSubscriptionManager } from './appender-subscription';

export interface Appender {
    onPublishLogMessage(logMessage: LogMessage): void;
}
