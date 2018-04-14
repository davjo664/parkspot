import {ParkSpotEntity} from './parkspot.entity';
import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';

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

  @IsBoolean()
  @ApiModelProperty()
  available: boolean;

  @IsBoolean()
  @ApiModelProperty()
  electricCharger: boolean;

  @IsString()
  @ApiModelProperty()
  imageURL: string;
}

/**
 * The QueryParams interface consists of all optional parameters. It is used
 * to query on requests using query params.
 * */
export class ParkSpotQueryParams implements Partial<ParkSpotEntity> {
  @ApiModelPropertyOptional()
  id: number;

  @ApiModelPropertyOptional()
  available: boolean;

  @ApiModelPropertyOptional()
  electricCharger: boolean;

  @ApiModelPropertyOptional()
  imageURL: string;
}
