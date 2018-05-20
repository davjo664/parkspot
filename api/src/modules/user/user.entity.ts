import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {FCMTokenType} from './fcm-token-type.enum';

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
}
