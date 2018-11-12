import { LogMessage } from '..';
import { BaseAppender } from './base-appender';
import { format } from './message-formatter';

export class ConsoleAppender extends BaseAppender {

    constructor() {
        super();
        this.logMessage$.subscribe(logMessage => {
            this.handleLogMessage(logMessage);
        });
    }

    private handleLogMessage(logMessage: LogMessage) {
        console[logMessage.level](format(logMessage));
    }

}
