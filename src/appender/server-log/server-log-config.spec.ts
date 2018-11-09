import { ServerLogConfig } from '.';
import { bodyBuilder, headers, method, serverLogConfig, url } from '../../test';
import { defaultBodyBuilder } from './body-builder';
import { applyDefaultConfig, toConfigFactory } from './server-log-config';

describe('serverLogConfig', () => {
    describe('applyDefaultConfig', () => {
        it('applies default values for missing values in the given config', () => {
            const partialConfig: Partial<ServerLogConfig> = { url };

            const config = applyDefaultConfig(partialConfig);

            expect(config.url).toBe(url);
            expect(config.method).toBe('POST');
            expect(config.headers).toBeInstanceOf(Headers);
            expect(config.bodyBuilder).toBe(defaultBodyBuilder);
        });

        it('does not overwrite existing values', () => {
            const partialConfig: Partial<ServerLogConfig> = {
                url,
                method,
                headers,
                bodyBuilder: defaultBodyBuilder
            };

            const config = applyDefaultConfig(partialConfig);

            expect(config.url).toBe(url);
            expect(config.method).toBe(method);
            expect(config.headers).toBe(headers);
            expect(config.bodyBuilder).toBe(defaultBodyBuilder);
        });

        it('throws an error if no url is provided', () => {
            const emptyConfig: Partial<ServerLogConfig> = {};

            expect(() => applyDefaultConfig(emptyConfig)).toThrowError();
        });
    });

    describe('toConfigFactory', () => {
        it('converts a URL string to a server log config factory', () => {
            const configFactory = toConfigFactory(url);
            const config = configFactory([]);

            expect(config.url).toBe(url);
        });

        it('converts a server log config to a server log config factory', () => {
            const configFactory = toConfigFactory(serverLogConfig);
            const config = configFactory([]);

            expect(config.url).toBe(url);
            expect(config.method).toBe(method);
            expect(config.headers).toBe(headers);
            expect(config.bodyBuilder).toBe(bodyBuilder);
        });

        it('returns the given value if it is already a function', () => {
            const expectedConfigFactory = () => serverLogConfig;
            const configFactory = toConfigFactory(expectedConfigFactory);

            expect(configFactory).toBe(expectedConfigFactory);
        });
    });
});
