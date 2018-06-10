import {Component, Inject} from '@nestjs/common';
import {ParkspotRepo} from './parkspot-repository.provider';
import {Observable} from 'rxjs/Observable';
import {ParkspotUpdate} from '../../subscriber/park-spot-update.subscriber';
import {parkspotSubscriptionToken} from './parkspot-subscription.provider';
import {PushNotificationService} from '../push-notification/push-notification.service';
import {SubscriptionService} from '../subscription/subscription.service';

@Component()
export class ParkspotSurveillanceService {

  constructor(private parkspotRepo: ParkspotRepo, @Inject(parkspotSubscriptionToken) private updates$: Observable<ParkspotUpdate>, private pushNotificationService: PushNotificationService, private subscriptionService: SubscriptionService) {
    this.parkSpotSurveillance();
  }

  private parkSpotSurveillance() {
    this.updates$.subscribe(async it => {
        try {
          await this.notify(it);

        } catch (e) {
          console.log('Couldn\'t notify users due to error: ', e);
        }
      }
    );
  }

  private async notify(update: ParkspotUpdate) {
    const userToNotify = await this.subscriptionService.getForSpot(update.id);
    await userToNotify.map(async subscription => {
      await this.pushNotificationService.send('Parkspot Update', `Your parking spot status has changed availability from ${update.availabilityBefore} to ${update.availabilityAfter}`, subscription.user);
    });

  }

}
