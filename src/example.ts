import { consoleAppender, createConsoleAppender, createServerLogAppender, getLogger, LogLevel } from '.';

const serverLogAppender = createServerLogAppender({
    method: 'PUT',
    url: 'http://example.org',
    bodyBuilder: logMessages => JSON.stringify({
        messages: logMessages
    })
});

const customConsoleAppender = createConsoleAppender(LogLevel.Info);

const logger = getLogger()
    .setLogLevel(LogLevel.Trace)
    .registerAppender(customConsoleAppender);

const { error, trace } = logger;

const childLogger = logger.getLogger('child')
    .setLogLevel(LogLevel.Trace)
    .registerAppender(consoleAppender)
    .registerAppender(serverLogAppender);

const { error: childError, trace: childTrace } = childLogger;

error('root error');
trace('root trace');
childError('child error');
childTrace('child trace');
