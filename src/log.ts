import { forEach } from 'lodash-es';

// tslint:disable:no-console

forEach({}, () => null);

export function error(message: string) {
    console.error(message);
}

export function warn(message: string) {
    console.warn(message);
}

export function log(message: string) {
    console.log(message);
}

export function info(message: string) {
    console.info(message);
}

export function debug(message: string) {
    console.debug(message);
}

export function trace(message: string) {
    console.trace(message);
}
