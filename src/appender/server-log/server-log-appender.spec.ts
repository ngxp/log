import { fakeSchedulers } from 'rxjs-marbles/jest';
import { ServerLogAppender } from '.';
import { Appender } from '..';
import { bufferTimeSpan, debugMessage, errorMessage, infoMessage, logMessage, serverLogConfig, spyOnFetch, traceMessage, warnMessage } from '../../test';

jest.useFakeTimers();

describe('ServerLogAppender', () => {
    let appender: Appender;
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
        appender = new ServerLogAppender(serverLogConfig, bufferTimeSpan);
        fetchSpy = spyOnFetch();
    });

    it('uses the given server log config for creating the request', fakeSchedulers(advance => {
        const expectedBody = serverLogConfig.bodyBuilder([logMessage]);
        appender.onPublishLogMessage(logMessage);

        advance(bufferTimeSpan);

        expect(window.fetch).toHaveBeenCalledWith(
            serverLogConfig.url,
            {
                method: serverLogConfig.method,
                headers: serverLogConfig.headers,
                body: expectedBody
            }
        );
    }));

    it('accepts a customized buffer time span', fakeSchedulers(advance => {
        const customizedBufferTimeSpan = bufferTimeSpan * 3;
        appender = new ServerLogAppender(serverLogConfig, customizedBufferTimeSpan);
        appender.onPublishLogMessage(logMessage);

        advance(bufferTimeSpan);

        expect(window.fetch).not.toHaveBeenCalled();

        advance(bufferTimeSpan * 2);

        expect(window.fetch).toHaveBeenCalledTimes(1);
    }));

    describe('onPublishLogMessage', () => {
        it('sends a request with all messages published within the buffer time span', fakeSchedulers(advance => {
            const expectedBody = serverLogConfig.bodyBuilder([
                errorMessage,
                warnMessage,
                logMessage,
                infoMessage,
                debugMessage,
                traceMessage
            ]);

            appender.onPublishLogMessage(errorMessage);
            appender.onPublishLogMessage(warnMessage);
            appender.onPublishLogMessage(logMessage);
            appender.onPublishLogMessage(infoMessage);
            appender.onPublishLogMessage(debugMessage);
            appender.onPublishLogMessage(traceMessage);

            advance(bufferTimeSpan);

            expect(window.fetch).toHaveBeenCalledTimes(1);
            // tslint:disable:no-unsafe-any
            expect(fetchSpy.mock.calls[0][1].body).toEqual(expectedBody);
        }));

        it('sends messages published after the first request in a separate request after the buffer time has expired again', fakeSchedulers(advance => {
            const expectedFirstBody = serverLogConfig.bodyBuilder([logMessage]);
            appender.onPublishLogMessage(logMessage);
            advance(bufferTimeSpan);

            const expectedSecondBody = serverLogConfig.bodyBuilder([errorMessage]);
            appender.onPublishLogMessage(errorMessage);
            advance(bufferTimeSpan);

            expect(window.fetch).toHaveBeenCalledTimes(2);
            // tslint:disable:no-unsafe-any
            expect(fetchSpy.mock.calls[0][1].body).toEqual(expectedFirstBody);
            // tslint:disable:no-unsafe-any
            expect(fetchSpy.mock.calls[1][1].body).toEqual(expectedSecondBody);
        }));

        it('sends no request if no log messages have been published', fakeSchedulers(advance => {
            advance(bufferTimeSpan);

            expect(window.fetch).not.toHaveBeenCalled();
        }));
    });
});
