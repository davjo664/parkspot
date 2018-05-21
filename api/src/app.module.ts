import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {UserModule} from './modules/user/user.module';
import {ConfigModule} from './modules/config/config.module';
import {ParkspotModule} from './modules/parkspot/parkspot.module';
import {InputModule} from './modules/input/input.module';
import {ParkingLotModule} from './modules/parkinglot/parking-lot.module';
import {SubscriptionModule} from './modules/subscription/subscription.module';
import {PushNotificationModule} from './modules/push-notification/push-notification.module';
import {FirebaseAppModule} from './modules/firebase-app/firebase-app.module';

@Module({
  imports: [
    FirebaseAppModule,
    UserModule,
    ConfigModule,
    ParkspotModule,
    ParkingLotModule,
    InputModule,
    SubscriptionModule,
    PushNotificationModule,
  ],
  controllers: [AppController],
  components: [],
})
export class AppModule {
}
