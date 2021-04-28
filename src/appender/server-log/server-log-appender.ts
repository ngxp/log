import { isEmpty } from 'lodash';
import { bufferTime, filter } from 'rxjs/operators';
import { LogMessage } from '../../log-message';
import { BaseAppender } from '../base-appender';
import { applyDefaultConfig, ServerLogConfigFactory, ServerLogConfigInit, toConfigFactory } from './server-log-config';

export class ServerLogAppender extends BaseAppender {

    private configFactory: ServerLogConfigFactory;

    constructor(
        serverLogConfig: ServerLogConfigInit,
        bufferTimeSpan = 2000
    ) {
        super();
        this.configFactory = toConfigFactory(serverLogConfig);
        this.logMessage$.pipe(
            bufferTime(bufferTimeSpan),
            filter(logMessages => !isEmpty(logMessages))
        )
            .subscribe(logMessages => this.handleLogMessage(logMessages));
    }

    private handleLogMessage(logMessages: LogMessage[]) {
        const { url, method, bodyBuilder, headers } = applyDefaultConfig(
            this.configFactory(logMessages)
        );

        window.fetch(url, {
            method,
            headers,
            body: bodyBuilder(logMessages)
        })
            .then(() => undefined)
            // tslint:disable-next-line:no-console
            .catch(error => console.warn(error));
    }
}
