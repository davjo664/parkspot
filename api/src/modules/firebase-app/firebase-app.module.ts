import {Module} from '@nestjs/common';
import {ConfigModule} from '../config/config.module';
import {firebaseAppProvider} from './firebase-app.provider';

@Module({
  modules: [
    ConfigModule,
  ],
  controllers: [],
  components: [firebaseAppProvider],
  exports: [firebaseAppProvider]
})
export class FirebaseAppModule {
}
