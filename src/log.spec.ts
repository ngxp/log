import { getLogger } from '.';

describe('log', () => {
    describe('getLogger', () => {
        it('returns the root logger if no name is passed', () => {
            const logger = getLogger();

            expect(logger.name).toBe('');
            expect(logger.parent).toBeNull();
        });
    });
});
