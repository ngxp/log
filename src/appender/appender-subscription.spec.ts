import { noop } from 'lodash-es';
import { Subscription } from 'rxjs';
import { AppenderSubscriptionManager } from '.';
import { createMockAppender } from '../test';

describe('AppenderSubscriptionManager', () => {
    let appenderSubscriptionManager: AppenderSubscriptionManager;
    const subscription = new Subscription();
    const appender = createMockAppender();

    beforeEach(() => {
        appenderSubscriptionManager = new AppenderSubscriptionManager();
        jest.spyOn(subscription, 'unsubscribe').mockImplementation(noop);
    });

    describe('add', () => {
        it('adds the appender and subscription', () => {
            appenderSubscriptionManager.add(appender, subscription);
        });

        it('allows the addition of the same appender and subscription multiple times', () => {
            appenderSubscriptionManager.add(appender, subscription);
            appenderSubscriptionManager.add(appender, subscription);
            appenderSubscriptionManager.add(appender, subscription);
        });
    });

    describe('remove', () => {
        it('unsubscribes the subscription of the given appenders', () => {
            appenderSubscriptionManager.add(appender, subscription);
            appenderSubscriptionManager.add(appender, subscription);
            appenderSubscriptionManager.add(appender, subscription);

            appenderSubscriptionManager.remove(appender);

            expect(subscription.unsubscribe).toHaveBeenCalledTimes(3);
        });
    });
});
