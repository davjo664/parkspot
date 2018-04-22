import {Connection} from 'typeorm';
import {DbConnectionToken} from '../database/database.provider';
import {Repository} from 'typeorm/repository/Repository';
import {ParkingLotEntity} from './parking-lot.entity';


/**
 * Inject this class in order to access the parkspot repository:
 *
 *    constructor(private ParkspotRepo: ParkspotRepo) {
 *    }
 *
 *  And don't forget to import the parkspot module to the corresponding module.
 * */
export abstract class ParkingLotRepo extends Repository<ParkingLotEntity> {
}

export const parkingLotRepoProvider = {
  provide: ParkingLotRepo,
  useFactory: (connection: Connection) => connection.getRepository(ParkingLotEntity),
  inject: [DbConnectionToken],
};

