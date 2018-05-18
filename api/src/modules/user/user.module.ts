import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {userRepoProvider} from './user-repository.provider';
import {UserService} from './user.service';
import {UserController} from './user.controller';

@Module({
  modules: [
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [
    UserController,
  ],
  components: [
    userRepoProvider,
    UserService,
  ],
  exports: [
    userRepoProvider,
    UserService,
  ]
})
export class UserModule {
}
