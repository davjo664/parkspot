import { Body, Controller, Get, HttpCode, HttpStatus, Post, Delete, ValidationPipe, Param, Query} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { SubscriptionDto, SubscriptionQueryParams } from './subscription.dto';
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from './subscription.entity';

@ApiUseTags('subscription')
@Controller('subscription')
export class SubscriptionController {

	constructor(private readonly subscriptionService: SubscriptionService) {
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of Parkspots',
    type: SubscriptionEntity,
    isArray: true,
  })
  async getAll(@Query() params: SubscriptionQueryParams): Promise<SubscriptionEntity[]> {
    return await this.subscriptionService.find(params);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.subscriptionService.remove(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: SubscriptionEntity,
  })
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Forbidden.'})
  @Post()
  async create(@Body(new ValidationPipe()) subscriptionDto: SubscriptionDto): Promise<void> {
    return await this.subscriptionService.create(subscriptionDto);
  }
}