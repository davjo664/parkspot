import {Component, Inject} from '@nestjs/common';
import {ParkspotRepo} from './parkspot-repository.provider';
import {Observable} from 'rxjs/Observable';
import {ParkspotUpdate} from '../../subscriber/park-spot-update.subscriber';
import {parkspotSpamSubscriptionToken, parkspotSubscriptionToken} from './parkspot-subscription.provider';
import {PushNotificationService} from '../push-notification/push-notification.service';
import {SubscriptionService} from '../subscription/subscription.service';
import {UserService} from '../user/user.service';

@Component()
export class ParkspotSurveillanceService {

  constructor(private parkspotRepo: ParkspotRepo, @Inject(parkspotSubscriptionToken) private updates$: Observable<ParkspotUpdate>,
              @Inject(parkspotSpamSubscriptionToken) private spamUpdate$: Observable<ParkspotUpdate>,
              private pushNotificationService: PushNotificationService, private subscriptionService: SubscriptionService,
              private userService: UserService,) {
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

    this.spamUpdate$.subscribe(async it => {
        try {
          await this.notifyAll(it);

        } catch (e) {
          console.log('Couldn\'t notify users due to error: ', e);
        }
      }
    );
  }


  private async notifyAll(update: ParkspotUpdate) {
    const users = await this.userService.get();
    const usersWithFcmToken = users.filter(it => it.fcmToken);
    await Promise.all(usersWithFcmToken.map(user => this.pushNotificationService.sendSilent(user, {
      type: 'spot-update',
      payload: `${update.id}`
    })));
  }

  private async notify(update: ParkspotUpdate) {
    const userToNotify = await this.subscriptionService.getForSpot(update.id);
    await Promise.all(userToNotify.map(async subscription => {
      await this.pushNotificationService.send('Parkspot', `Your parking spot is sadly no longer available!`, subscription.user, {type: 'spot-taken', payload: `${update.id}`});
    }));

  }

}
