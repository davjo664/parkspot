import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {parkspotRepoProvider} from './parkspot-repository.provider';
import {ParkspotService} from './parkspot.service';
import {ParkspotController} from './parkspot.controller';
import {parkspotSpamSubscriptionProvider, parkspotSubscriptionProvider} from './parkspot-subscription.provider';
import {ParkspotSurveillanceService} from './parkspot-surveillance.service';
import {PushNotificationModule} from '../push-notification/push-notification.module';
import {SubscriptionModule} from '../subscription/subscription.module';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    PushNotificationModule,
    SubscriptionModule,
    UserModule,
  ],
  controllers: [
    ParkspotController,
  ],
  components: [
    parkspotRepoProvider,
    ParkspotService,
    parkspotSubscriptionProvider,
    ParkspotSurveillanceService,
    parkspotSpamSubscriptionProvider,
  ],
  exports: [
    parkspotRepoProvider,
    ParkspotService,
  ]
})
export class ParkspotModule {
}
