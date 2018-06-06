import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, ValidationPipe} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {SubscriptionDto, SubscriptionQueryParams} from './subscription.dto';
import {SubscriptionService} from './subscription.service';
import {SubscriptionEntity} from './subscription.entity';

@ApiUseTags('subscription')
@Controller('subscription')
export class SubscriptionController {

  constructor(private readonly subscriptionService: SubscriptionService) {
  }

  @Get()
  @ApiOperation({title: 'Get all Subscriptions for a User'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of the subscriptions for a user. Currently lacks support of proper user validation and therefore takes the user id',
    isArray: true,
  })
  async getMy(@Query() params: SubscriptionQueryParams): Promise<SubscriptionEntity[]> {
    return await this.subscriptionService.find(params);
  }

  @Delete('/:id')
  @ApiOperation({title: 'Delete a specific subscription'})
  async remove(@Param('id') id: number): Promise<void> {
    return await this.subscriptionService.remove(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({title: 'Create a Subscription for a User'})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Forbidden.'})
  @Post()
  async create(@Body(new ValidationPipe()) subscriptionDto: SubscriptionDto): Promise<void> {
    return await this.subscriptionService.create(subscriptionDto);
  }
}
