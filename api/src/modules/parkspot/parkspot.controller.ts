import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ParkspotService} from './parkspot.service';
import {ParkSpotDto, ParkSpotIsAvailableParams, ParkSpotQueryParams} from './parkspot.dto';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {ParkSpotEntity} from './parkspot.entity';

@ApiUseTags('parkspot')
@Controller('parkspot')
export class ParkspotController {
  constructor(private readonly parkSpotService: ParkspotService) {
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of Parkspots',
    type: ParkSpotEntity,
    isArray: true,
  })
  async getAll(@Query() params: ParkSpotQueryParams): Promise<ParkSpotEntity[]> {
    return await this.parkSpotService.find(params);
  }

  @Get('/:id')
  @ApiResponse({status: HttpStatus.OK, description: 'Returns a single ParkingSpot', type: ParkSpotEntity})
  async get(@Param('id') id: number): Promise<ParkSpotEntity> {
    return await this.parkSpotService.findOne(id);
  }

  @Get('/:lat/:lng/:dist')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of ParkingSpots by radius',
    type: ParkSpotEntity,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Occours for illegal parameters',
  })
  async query(@Param('lat') lat: string, @Param('lng') lng: string, @Param('dist') dist: string): Promise<ParkSpotEntity[]> {
    return await this.parkSpotService.geoQuery(parseInt(lat, 10), parseInt(lng, 10), parseInt(dist, 10));
  }

  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updates a single ParkingSpot',
    type: ParkSpotEntity
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ParkingSpot was not modified',
  })
  async update(@Param('id') id: number, @Body(new ValidationPipe()) updateData: ParkSpotQueryParams): Promise<ParkSpotEntity> {
    return await this.parkSpotService.update(id, updateData);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: ParkSpotEntity,
  })
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Forbidden.'})
  @Post()
  async create(@Body(new ValidationPipe()) parkSpotDto: ParkSpotDto): Promise<ParkSpotEntity> {
    return await this.parkSpotService.create(parkSpotDto);
  }

  @Post('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updates status of a ParkingSpot',
    type: ParkSpotEntity
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ParkingSpot was not updated',
  })
  async updateAvailability(@Param('id') id: number, @Body(new ValidationPipe()) updateData: ParkSpotIsAvailableParams): Promise<ParkSpotEntity> {
    return await this.parkSpotService.updateAvailability(id, updateData);
  }
}
