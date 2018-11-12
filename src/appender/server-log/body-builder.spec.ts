import { logMessages } from '../../test';
import { format } from '../message-formatter';
import { defaultBodyBuilder } from './body-builder';

describe('bodyBuilder', () => {

    describe('defaultBodyBuilder', () => {
        it('stringifies the array of log messages', () => {
            expect(defaultBodyBuilder(logMessages)).toBe(JSON.stringify(logMessages.map(
                message => ({
                    level: message.level,
                    message: format(message)
                })
            )));
        });
    });

});
