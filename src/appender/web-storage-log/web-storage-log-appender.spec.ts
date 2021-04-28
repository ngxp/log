import { times } from 'lodash';
import { WebStorageLogAppender } from '.';
import { Appender } from '..';
import { LogMessage } from '../../log-message';
import { errorMessage, logMessage, maxLogSize, spyOnLocalStorage, spyOnSessionStorage, webStorageLogConfig } from '../../test';
import { StorageType } from './web-storage-log-config';

jest.useFakeTimers();

describe('WebStorageLogAppender', () => {
    let appender: Appender;
    const spy: { [key: string]: jest.SpyInstance } = {};

    beforeEach(() => {
        appender = new WebStorageLogAppender(webStorageLogConfig);
        spy[StorageType.LocalStorage] = spyOnLocalStorage();
        spy[StorageType.SessionStorage] = spyOnSessionStorage();
    });

    describe('onPublishLogMessage', () => {
        [
            StorageType.LocalStorage,
            StorageType.SessionStorage
        ]
            .forEach(storageType => {
                describe(storageType, () => {
                    it('uses the configured storage type and key to store the log message', () => {
                            appender = new WebStorageLogAppender({
                                ...webStorageLogConfig,
                                storageType
                            });

                            appender.onPublishLogMessage(logMessage);

                            expect(spy[storageType]).toHaveBeenCalledWith(webStorageLogConfig.storageItemKey, JSON.stringify([logMessage]));
                        });
                    });

                    it('only stores the configured amount of log messages', () => {
                        appender = new WebStorageLogAppender({
                            ...webStorageLogConfig,
                            storageType,
                            maxLogSize
                        });

                        times(maxLogSize, () => appender.onPublishLogMessage(logMessage));
                        appender.onPublishLogMessage(errorMessage);

                        const storedLogMessages: LogMessage[] = <LogMessage[]> JSON.parse(<string> window[storageType].getItem(webStorageLogConfig.storageItemKey));

                        expect(storedLogMessages).toHaveLength(maxLogSize);
                        expect(storedLogMessages[maxLogSize - 1]).toEqual(errorMessage);
                    });

            });
    });

});
