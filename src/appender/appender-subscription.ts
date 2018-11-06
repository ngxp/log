import { find, isUndefined, without } from 'lodash';
import { Subscription } from 'rxjs';
import { Appender } from '.';

interface AppenderSubscription {
    appender: Appender;
    subscription: Subscription;
}

export class AppenderSubscriptionManager {
    private subscriptions: AppenderSubscription[] = [];

    add(appender: Appender, subscription: Subscription) {
        this.subscriptions = [
            ...this.subscriptions,
            { appender, subscription }
        ];
    }

    remove(appenderToRemove: Appender) {
        const appenderSubscription = find(this.subscriptions,
            ({ appender}) => appender === appenderToRemove
        );

        if (isUndefined(appenderSubscription)) {
            return;
        }

        appenderSubscription.subscription.unsubscribe();

        this.subscriptions = without(this.subscriptions, appenderSubscription);
    }
}
