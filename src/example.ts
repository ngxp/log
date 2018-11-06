import { Appender, getLogger, LogLevel } from '.';

const appender: Appender = {
    // tslint:disable-next-line:no-console
    onPublishLogMessage: (logMessage => console.error(`${logMessage.level.toUpperCase()} ${logMessage.loggerName} ${logMessage.message}`))
};

const logger = getLogger()
    .setLogLevel(LogLevel.Trace)
    .registerAppender(appender);

const { error, trace } = logger;

const childLogger = logger.getLogger('child')
    .setLogLevel(LogLevel.Trace)
    .registerAppender(appender);

const { error: childError, trace: childTrace } = childLogger;

error('root error');
trace('root trace');
childError('child error');
childTrace('child trace');
