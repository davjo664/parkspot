import {Column, PrimaryGeneratedColumn, Entity, ManyToOne} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {UserEntity} from '../user/user.entity';
import {ParkSpotEntity} from '../parkspot/parkspot.entity';

@Entity()
export class SubscriptionEntity {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
  id: number;
  
	@ManyToOne(type => ParkSpotEntity, parkspot => parkspot.subscriptions)
	@ApiModelProperty()
	parkSpot: ParkSpotEntity;

	@ManyToOne(type => UserEntity, user => user.subscriptions)
	@ApiModelProperty()
	user: UserEntity;
}
