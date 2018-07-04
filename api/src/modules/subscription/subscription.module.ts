import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {SubscriptionController} from './subscription.controller';
import {SubscriptionService} from './subscription.service';
import {SubscriptionRepoProvider} from './subscription-repository.provider';
import {UserModule} from '../user/user.module';

@Module({
  modules: [
    DatabaseModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [
    SubscriptionController
  ],
  components: [
    SubscriptionRepoProvider,
    SubscriptionService
  ],
  exports: [
    SubscriptionRepoProvider,
    SubscriptionService,
  ]
})
export class SubscriptionModule {
}
