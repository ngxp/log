import { logMessages, mockTimestamp } from '../../test';
import { format } from '../message-formatter';
import { defaultBodyBuilder } from './body-builder';

describe('bodyBuilder', () => {

    beforeEach(() => {
        mockTimestamp();
    });

    describe('defaultBodyBuilder', () => {
        it('stringifies the array of log messages', () => {
            expect(defaultBodyBuilder(logMessages)).toBe(JSON.stringify(logMessages.map(
                message => ({
                    level: message.level,
                    message: format(message),
                    timestamp: message.timestamp
                })
            )));
        });
    });

});
