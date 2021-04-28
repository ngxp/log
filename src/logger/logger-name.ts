import { isNull } from 'lodash';
import { Logger } from '../logger';

const SEPARATOR = '.';

export function getLoggerName(simpleName: string, parent: Logger | null) {
    if (isNull(parent)) {
        return simpleName;
    }

    return [
        parent.name,
        simpleName
    ]
        .join(SEPARATOR);
}

export function isValidSimpleName(name: string) {
    return !name.includes(SEPARATOR);
}
