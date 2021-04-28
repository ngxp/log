import { consoleAppender, createConsoleAppender, createWebStorageLogAppender, getLogger, LogLevel, StorageType } from './src/index';

const customConsoleAppender = createConsoleAppender(LogLevel.Info);
const webStorageLogAppender = createWebStorageLogAppender({
    storageType: StorageType.SessionStorage,
    maxLogSize: 5,
    storageItemKey: 'somekey'
}, LogLevel.Error);

const logger = getLogger()
    .setLogLevel(LogLevel.Trace)
    .registerAppender(customConsoleAppender);

const { error, info } = logger;

const libLogger = logger.getLogger('myLib')
    .setLogLevel(LogLevel.Warn)
    .registerAppender(consoleAppender)
    .registerAppender(webStorageLogAppender);

const { error: libError, info: libInfo } = libLogger;

error('root error');
info('root info');
libError('lib error');
libInfo('lib info');
