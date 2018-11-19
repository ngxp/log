import { isNull, takeRight } from 'lodash-es';
import { LogMessage } from '../../log-message';
import { BaseAppender } from '../base-appender';
import { applyDefaultConfig, StorageType, WebStorageLogConfig } from './web-storage-log-config';

export class WebStorageLogAppender extends BaseAppender {

    private config: WebStorageLogConfig;

    private get storage(): Storage {
        if (this.config.storageType === StorageType.LocalStorage) {
            return window.localStorage;
        }

        if (this.config.storageType === StorageType.SessionStorage) {
            return window.sessionStorage;
        }

        throw new Error(`Invalid storage type: <${this.config.storageType}>`);
    }

    private get logMessages(): LogMessage[] {
        const messages = this.storage.getItem(this.config.storageItemKey);
        return isNull(messages) ? [] : <LogMessage[]> JSON.parse(messages);
    }

    private set logMessages(logMessages: LogMessage[]) {
        this.storage.setItem(this.config.storageItemKey, JSON.stringify(logMessages));
    }

    constructor(
        webStorageLogConfig: Partial<WebStorageLogConfig>
    ) {
        super();
        this.config = applyDefaultConfig(webStorageLogConfig);
        this.logMessage$.subscribe(logMessage => {
            this.handleLogMessage(logMessage);
        });
    }

    private handleLogMessage(logMessage: LogMessage) {
        this.logMessages = [
            ...takeRight(this.logMessages, this.config.maxLogSize - 1),
            logMessage
        ];
    }
}
