import {Component, HttpException, HttpStatus} from '@nestjs/common';
import {ParkingLotRepo} from './parking-lot-repository.provider';

@Component()
export class ParkingLotService {

  constructor(private parkingLotRepo: ParkingLotRepo) {
  }

  findOne(id: number) {
    const it = this.parkingLotRepo.findOne(id);
    if (!it) {
      throw new HttpException(`ParkingLot with id '${id}'doesnt exist`, HttpStatus.NOT_FOUND);
    }
    return it;
  }
}
