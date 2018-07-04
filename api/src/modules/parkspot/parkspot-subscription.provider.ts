import {ParkSpotUpdateSubscriber} from '../../subscriber/park-spot-update.subscriber';


export const parkspotSubscriptionToken = Symbol('parkspotSubscriptionProvider');


/**
 * Usage: @Inject(parkspotSubscriptionToken) private updates$: Observable<ParkspotUpdate>
 */
export const parkspotSubscriptionProvider = {
  provide: parkspotSubscriptionToken,
  useValue: ParkSpotUpdateSubscriber.parkspotUpdates$,
};



// todo remove this as soon as possible:
export const parkspotSpamSubscriptionToken = Symbol('parkspotSubscriptionProvider');

/**
 * Usage: @Inject(parkspotSpamSubscriptionToken) private updates$: Observable<ParkspotUpdate>
 */
export const parkspotSpamSubscriptionProvider = {
  provide: parkspotSpamSubscriptionToken,
  useValue: ParkSpotUpdateSubscriber.spamUpdate$,
};

