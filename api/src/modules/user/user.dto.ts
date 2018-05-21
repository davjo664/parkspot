import {UserEntity} from './user.entity';
import {IsDate, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {FCMTokenType} from './fcm-token-type.enum';

export class UserUpdateDto implements Partial<UserEntity> {

  @IsNumber()
  @IsOptional()
  @ApiModelPropertyOptional()
  id: number;

  @IsDate()
  @IsOptional()
  @ApiModelPropertyOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @ApiModelPropertyOptional()
  updatedAt: Date;


  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  fcmToken: string;


  @IsNumber()
  @IsOptional()
  @ApiModelPropertyOptional()
  fcmTokenType: FCMTokenType;

}


export class UserCreateDto implements Partial<UserEntity> {

  @IsString()
  @ApiModelProperty()
  fcmToken: string;

  @IsNumber()
  @ApiModelProperty()
  fcmTokenType: FCMTokenType;

}
