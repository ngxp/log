export enum StorageType {
    LocalStorage = 'localStorage',
    SessionStorage = 'sessionStorage'
}

export interface WebStorageLogConfig {
    storageType: StorageType;
    maxLogSize: number;
    storageItemKey: string;
}

export const defaultStorageItemKey = 'ngxp_log_messages';

export function applyDefaultConfig(partialConfig: Partial<WebStorageLogConfig>): WebStorageLogConfig {
    const config: Partial<WebStorageLogConfig> = {
        storageType: StorageType.LocalStorage,
        maxLogSize: 1000,
        storageItemKey: defaultStorageItemKey,
        ...partialConfig
    };

    return <WebStorageLogConfig> config;
}
