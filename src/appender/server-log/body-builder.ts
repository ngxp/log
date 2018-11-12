import { isEmpty } from 'lodash-es';
import { LogMessage } from '../../log-message';

export type BodyBuilder = (logMessages: LogMessage[]) => string;

export const defaultBodyBuilder: BodyBuilder = (logMessages: LogMessage[]) => {
    const messages = logMessages
        .map(message => ({
            level: message.level,
            message: [
                message.loggerName.substr(1),
                message.message
            ]
                .filter(part => !isEmpty(part))
                .join(' ')
        }));
    return JSON.stringify(messages);
};
