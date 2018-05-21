import {IsNumber} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {SubscriptionEntity} from './subscription.entity';
import {ParkSpotEntity} from '../parkspot/parkspot.entity';
import {UserEntity} from '../user/user.entity';

export class SubscriptionDto implements Partial<SubscriptionEntity> {
	@IsNumber()
  @ApiModelProperty()
	id: number;

  @ApiModelProperty()
	parkSpot: ParkSpotEntity;

  @ApiModelProperty()
	user: UserEntity;
}

/**
 * The QueryParams interface consists of all optional parameters. It is used
 * to query on requests using query params.
 * */
export class SubscriptionQueryParams implements Partial<SubscriptionEntity> {

  @ApiModelProperty({type: 'number'})
	user: UserEntity;
}
