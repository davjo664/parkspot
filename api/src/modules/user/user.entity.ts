import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {FCMTokenType} from './fcm-token-type.enum';
import {SubscriptionEntity} from '../subscription/subscription.entity';
import {PushTarget} from '../../utils/push-target.interface';

@Entity()
export class UserEntity implements PushTarget {
  @ApiModelPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelPropertyOptional()
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @ApiModelPropertyOptional()
  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  @ApiModelProperty()
  @Column({type: 'text'})
  fcmToken: string;

  @ApiModelProperty()
  @Column({type: 'integer'})
  fcmTokenType: FCMTokenType;

  @ApiModelPropertyOptional()
  @OneToMany(type => SubscriptionEntity, subscription => subscription.user)
  subscriptions: SubscriptionEntity[];
}
