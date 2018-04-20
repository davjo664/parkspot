import {Component, HttpException, HttpStatus} from '@nestjs/common';
import {InputDto} from './input.dto';
import {ParkspotService} from '../parkspot/parkspot.service';

@Component()
export class InputService {


  constructor(private parkSpotService: ParkspotService) {
  }

  async update(inputDtos: InputDto[]): Promise<void> {
    // todo permission check.
    // todo check if entity exist?
    try {
      await Promise.all(
        inputDtos.map(it => {
          const {parkSpotId, ...update} = it;
          return this.parkSpotService.update(parkSpotId, update);
        })
      );
    }
    catch (e) {
      console.error(e);
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }
}
