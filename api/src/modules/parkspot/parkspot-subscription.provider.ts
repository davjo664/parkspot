import {ParkSpotUpdateSubscriber} from '../../subscriber/park-spot-update.subscriber';


export const parkspotSubscriptionToken = Symbol('parkspotSubscriptionProvider');


/**
 * Usage: @Inject(parkspotSubscriptionToken) private updates$: Observable<ParkspotUpdate>
 */
export const parkspotSubscriptionProvider = {
  provide: parkspotSubscriptionToken,
  useValue: ParkSpotUpdateSubscriber.parkspotUpdates$,
};

