import { consoleAppender, createConsoleAppender, getLogger, LogLevel } from '.';
import { spyOnConsoleMethods } from './test';

// tslint:disable:no-console

describe('@ngxp/log', () => {

    beforeEach(() => {
        spyOnConsoleMethods();
    });

    it('integration test', () => {
        const customConsoleAppender = createConsoleAppender(LogLevel.Info);

        const logger = getLogger()
            .setLogLevel(LogLevel.Trace)
            .registerAppender(customConsoleAppender);

        const { error, info } = logger;

        const childLogger = logger.getLogger('child')
            .setLogLevel(LogLevel.Warn)
            .registerAppender(consoleAppender);

        const { error: childError, info: childInfo } = childLogger;

        error('root error');
        info('root info');
        childError('child error');
        childInfo('child info');

        expect(console.error).toHaveBeenCalledTimes(3);
        expect(console.error).toHaveBeenNthCalledWith(1, 'root error');
        expect(console.error).toHaveBeenNthCalledWith(2, 'child error');
        expect(console.error).toHaveBeenNthCalledWith(3, 'child error');
        expect(console.info).toHaveBeenCalledTimes(2);
        expect(console.info).toHaveBeenNthCalledWith(1, 'root info');
        expect(console.info).toHaveBeenNthCalledWith(2, 'child info');
    });
});
