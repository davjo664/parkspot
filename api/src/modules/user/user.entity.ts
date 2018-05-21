import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {FCMTokenType} from './fcm-token-type.enum';
import {SubscriptionEntity} from '../subscription/subscription.entity';

@Entity()
export class UserEntity {
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
