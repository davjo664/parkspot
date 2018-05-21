import {Module} from '@nestjs/common';
import {ConfigModule} from '../config/config.module';
import {PushNotificationService} from './push-notification.service';
import {pushNotificationProvider} from './push-notification-sender.provider';

@Module({
  modules: [
    ConfigModule,
  ],
  controllers: [],
  components: [
    PushNotificationService,
    pushNotificationProvider,

  ],
  exports: [
    PushNotificationService,
  ]
})
export class PushNotificationModule {
}
