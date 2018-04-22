import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {ConfigModule} from '../config/config.module';
import {ParkingLotController} from './parking-lot.controller';
import {parkingLotRepoProvider} from './parking-lot-repository.provider';
import {ParkingLotService} from './parking-lot.service';

@Module({
  modules: [
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [
    ParkingLotController,
  ],
  components: [
    parkingLotRepoProvider,
    ParkingLotService,
  ],
  exports: [
    parkingLotRepoProvider,
    ParkingLotService,
  ]
})
export class ParkingLotModule {
}
