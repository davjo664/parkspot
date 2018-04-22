import {IsNumber, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {ParkingLotEntity} from './parking-lot.entity';

/**
 * The dto is used whenever data is submitted as payload to the API.
 *
 * ApiModelProperty or ApiModelPropertyOptional is required in order to generate API documentation.
 *
 * */
export class ParkingLotDto implements Partial<ParkingLotEntity> {

  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsString()
  @ApiModelProperty()
  name: string;

}
