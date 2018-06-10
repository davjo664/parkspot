import {Module} from '@nestjs/common';
import {ConfigModule} from '../config/config.module';
import {PushNotificationService} from './push-notification.service';
import {pushNotificationMockProvider} from './push-notification-sender.provider';
import {FirebaseAppModule} from '../firebase-app/firebase-app.module';

@Module({
  modules: [
    ConfigModule,
    FirebaseAppModule,
  ],
  controllers: [],
  components: [
    PushNotificationService,
    pushNotificationMockProvider,

  ],
  exports: [
    PushNotificationService,
  ]
})
export class PushNotificationModule {
}
