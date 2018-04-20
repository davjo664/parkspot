import {IsBoolean, IsNumber} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class InputDto {

  @IsNumber()
  @ApiModelProperty()
  parkSpotId: number;

  @IsBoolean()
  @ApiModelProperty()
  available: boolean;
}
