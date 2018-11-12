import { isEmpty } from 'lodash-es';
import { LogMessage } from '../log-message';

export function format(logMessage: LogMessage) {
    return [
        logMessage.timestamp,
        logMessage.loggerName.substr(1),
        logMessage.message
    ]
        .filter(part => !isEmpty(part))
        .join(' ');
}
