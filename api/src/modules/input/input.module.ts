import {Module} from '@nestjs/common';
import {InputService} from './input.service';
import {ParkspotModule} from '../parkspot/parkspot.module';
import {ParkspotController} from './input.controller';

@Module({
  modules: [
    ParkspotModule,
  ],
  controllers: [
    ParkspotController
  ],
  components: [
    InputService,
  ],
  exports: [
    InputService,
  ]
})
export class InputModule {
}
