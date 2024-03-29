import { isFunction, isString, isUndefined } from 'lodash';
import { LogMessage } from '../../log-message';
import { BodyBuilder, defaultBodyBuilder } from './body-builder';

export type ServerLogConfigInit = string | Partial<ServerLogConfig> | ServerLogConfigFactory;

export type ServerLogConfigFactory = (logMessages: LogMessage[]) => Partial<ServerLogConfig>;

export interface ServerLogConfig {
    url: string;
    method: 'POST' | 'PUT';
    headers: Headers;
    bodyBuilder: BodyBuilder;
}

export function applyDefaultConfig(partialConfig: Partial<ServerLogConfig>): ServerLogConfig {
    const config: Partial<ServerLogConfig> = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        bodyBuilder: defaultBodyBuilder,
        ...partialConfig
    };

    if (isUndefined(config.url)) {
        throw new Error('No url provided in server log config.');
    }

    return <ServerLogConfig> config;
}

export function toConfigFactory(config: ServerLogConfigInit): ServerLogConfigFactory {
    if (isFunction(config)) {
        return config;
    }

    if (isString(config)) {
        return () => ({
            url: config
        });
    }

    return () => <Partial<ServerLogConfig>> config;
}
