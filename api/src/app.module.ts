import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {UserModule} from './modules/user/user.module';
import {ConfigModule} from './modules/config/config.module';
import {ParkspotModule} from './modules/parkspot/parkspot.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    ParkspotModule,
  ],
  controllers: [AppController],
  components: [],
})
export class AppModule {
}
