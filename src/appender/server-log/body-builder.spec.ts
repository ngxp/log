import { logMessages } from '../../test';
import { defaultBodyBuilder } from './body-builder';

describe('bodyBuilder', () => {
    describe('defaultBodyBuiler', () => {
        it('stringifies the array of log messages', () => {
            expect(defaultBodyBuilder(logMessages)).toBe(JSON.stringify(logMessages));
        });
    });
});
