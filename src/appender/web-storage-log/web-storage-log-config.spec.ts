import { WebStorageLogConfig } from '.';
import { maxLogSize, storageItemKey, storageType } from '../../test';
import { applyDefaultConfig, defaultStorageItemKey } from './web-storage-log-config';

describe('webStorageLogConfig', () => {
    describe('applyDefaultConfig', () => {
        it('applies default values for missing values in the given config', () => {
            const partialConfig: Partial<WebStorageLogConfig> = { storageType };

            const config = applyDefaultConfig(partialConfig);

            expect(config.storageType).toBe(storageType);
            expect(config.maxLogSize).toBe(1000);
            expect(config.storageItemKey).toBe(defaultStorageItemKey);
        });

        it('does not overwrite existing values', () => {
            const partialConfig: Partial<WebStorageLogConfig> = {
                storageType,
                storageItemKey,
                maxLogSize
            };

            const config = applyDefaultConfig(partialConfig);

            expect(config.storageType).toBe(storageType);
            expect(config.storageItemKey).toBe(storageItemKey);
            expect(config.maxLogSize).toBe(maxLogSize);
        });
    });
});
