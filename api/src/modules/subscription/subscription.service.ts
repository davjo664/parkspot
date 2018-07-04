import {Component, HttpException, HttpStatus} from '@nestjs/common';
import {SubscriptionDto, SubscriptionQueryParams} from './subscription.dto';
import {SubscriptionRepo} from './subscription-repository.provider';
import {SubscriptionEntity} from './subscription.entity';
import {UserService} from '../user/user.service';
import {ParkspotService} from '../parkspot/parkspot.service';

@Component()
export class SubscriptionService {

  constructor(private subscriptionRepo: SubscriptionRepo, private userService: UserService, private parkspotService: ParkspotService) {
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

  async create(subscription: SubscriptionDto): Promise<void> {

    const user = await this.userService.findOne(subscription.userId);
    const parkSpot = await this.parkspotService.findOne(subscription.parkSpotId);

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.CONFLICT);
    }

    if (!parkSpot) {
      throw new HttpException(`ParkSpot doesn't exist`, HttpStatus.CONFLICT);
    }

    try {
      await this.subscriptionRepo.insert({
        parkSpot,
        user
      });
    } catch (e) {
      throw new HttpException(`Subscription already exists`, HttpStatus.CONFLICT);
    }
  }
}
