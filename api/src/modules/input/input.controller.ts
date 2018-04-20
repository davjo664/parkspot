import {Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {InputDto} from './input.dto';
import {InputService} from './input.service';

@ApiUseTags('input')
@Controller('input')
export class ParkspotController {

  constructor(private inputService: InputService) {
  }

  @ApiOperation({description: 'For direct usage from device', title: 'updates multiple ParkSpot states at once'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The records have been successfully updated.',
    type: InputDto,
    isArray: true,
  })
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Something went wrong.'})
  @Post()
  async create(@Body(new ValidationPipe()) inputDtos: InputDto[]): Promise<void> {
    return await this.inputService.update(inputDtos);
  }


}
