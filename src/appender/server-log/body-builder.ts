import { LogMessage } from '../../log-message';
import { format } from '../message-formatter';

export type BodyBuilder = (logMessages: LogMessage[]) => string;

export const defaultBodyBuilder: BodyBuilder = (logMessages: LogMessage[]) => {
    const messages = logMessages
        .map(message => ({
            level: message.level,
            message: format(message)
        }));
    return JSON.stringify(messages);
};
