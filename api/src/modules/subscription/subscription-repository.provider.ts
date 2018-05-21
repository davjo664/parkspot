import {Connection} from 'typeorm';
import {SubscriptionEntity} from "./subscription.entity";
import {DbConnectionToken} from '../database/database.provider';
import {Repository} from 'typeorm/repository/Repository';


/**
 * Inject this class in order to access the subscription repository:
 *
 *    constructor(private SubscriptionRepo: SubscriptionRepo) {
 *    }
 *
 *  And don't forget to import the parkspot module to the corresponding module.
 * */
export abstract class SubscriptionRepo extends Repository<SubscriptionEntity> {
}

export const SubscriptionRepoProvider = {
  provide: SubscriptionRepo,
  useFactory: (connection: Connection) => connection.getRepository(SubscriptionEntity),
  inject: [DbConnectionToken],
};