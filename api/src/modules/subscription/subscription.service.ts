import {Component, HttpException, HttpStatus} from '@nestjs/common';
import {SubscriptionQueryParams} from './subscription.dto';
import {SubscriptionRepo} from './subscription-repository.provider';
import {SubscriptionEntity} from './subscription.entity';

@Component()
export class SubscriptionService {

  constructor(private subscriptionRepo: SubscriptionRepo) {
  }

  async find(params: SubscriptionQueryParams): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepo.find(params);
  }


  /**
   * Returns all subscriptions for a specific parking spot */
  async getForSpot(parkSpotId: number): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepo.createQueryBuilder('sub')
      .where(`sub."parkSpotId" = :parkSpotId`, {parkSpotId})
      .leftJoinAndSelect('sub.user', 'user')
      .getMany();
  }

  async remove(id: number): Promise<void> {
    let subscriptionToRemove = await this.subscriptionRepo.findOne(id);
    await this.subscriptionRepo.remove(subscriptionToRemove);
  }

  async create(subscription: SubscriptionEntity): Promise<void> {
    try {
      await this.subscriptionRepo.insert(subscription);
    } catch (e) {
      throw new HttpException(`Subscription already exists`, HttpStatus.CONFLICT);
    }
  }
}
