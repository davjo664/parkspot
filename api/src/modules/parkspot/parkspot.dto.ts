import {ParkSpotEntity} from './parkspot.entity';
import {IsArray, IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {SubscriptionEntity} from '../subscription/subscription.entity';

/**
 * The dto is used whenever data is submitted as payload to the API.
 *
 * ApiModelProperty or ApiModelPropertyOptional is required in order to generate API documentation.
 *
 * */
export class ParkSpotDto implements Partial<ParkSpotEntity> {

  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsNumber()
  @ApiModelProperty()
  lat: number;

  @IsNumber()
  @ApiModelProperty()
  lng: number;

  @IsBoolean()
  @ApiModelProperty()
  available: boolean;

  @IsBoolean()
  @ApiModelProperty()
  electricCharger: boolean;

  @IsBoolean()
  @ApiModelProperty()
  handicapped: boolean;

  @IsString()
  @ApiModelProperty()
  imageURL: string;

  @IsString()
  @ApiModelProperty()
  street: string;


  @Column()
  @ApiModelProperty()
  houseNumber: string;

  @IsString()
  @ApiModelProperty()
  city: string;

  @IsString()
  @ApiModelProperty()
  country: string;

  @IsString()
  @ApiModelProperty()
  postalCode: string;

  @IsOptional()
  @IsArray()
  @ApiModelPropertyOptional({type: SubscriptionEntity, isArray: true})
  subscriptions: SubscriptionEntity[];


}

/**
 * The QueryParams interface consists of all optional parameters. It is used
 * to query on requests using query params.
 * */
export class ParkSpotQueryParams implements Partial<ParkSpotEntity> {
  @ApiModelPropertyOptional()
  id: number;

  @ApiModelPropertyOptional()
  lat: number;

  @ApiModelPropertyOptional()
  lng: number;

  @ApiModelPropertyOptional()
  available: boolean;

  @ApiModelPropertyOptional()
  electricCharger: boolean;


  @ApiModelPropertyOptional()
  handicapped: boolean;

  @ApiModelPropertyOptional()
  imageURL: string;
}
