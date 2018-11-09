import { LogMessage } from '..';
import { BaseAppender } from './base-appender';

export class ConsoleAppender extends BaseAppender {

    constructor() {
        super();
        this.logMessage$.subscribe(logMessage => {
            this.handleLogMessage(logMessage);
        });
    }

    private handleLogMessage(logMessage: LogMessage) {
        console[logMessage.level](logMessage.message);
    }

}
