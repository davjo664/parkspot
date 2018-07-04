import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {UserEntity} from '../user/user.entity';
import {ParkSpotEntity} from '../parkspot/parkspot.entity';

@Entity()
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @ManyToOne(type => ParkSpotEntity, parkspot => parkspot.subscriptions, {eager: true})
  @ApiModelProperty()
  parkSpot: ParkSpotEntity;

  @ManyToOne(type => UserEntity, user => user.subscriptions, {eager: true})
  @ApiModelProperty()
  user: UserEntity;
}
