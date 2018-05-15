import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ParkspotService} from './parkspot.service';
import {ParkSpotDto, ParkSpotQueryParams} from './parkspot.dto';
import {ApiImplicitParam, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
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

  @ApiOperation({description: 'return value "dist" shows the distance in km', title: 'returns a list of ParkingSpots by radius'})
  @ApiImplicitParam({name: 'lat', description: 'Latitude: e.g. 48.772748 [gps]', required: true, type: 'number'})
  @ApiImplicitParam({name: 'lng', description: 'Longitude: e.g. 9.156502 [gps]', required: true, type: 'number'})
  @ApiImplicitParam({name: 'dist', description: 'Distance: e.g. 3.4 [km]', required: true, type: 'number'})
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
    return await this.parkSpotService.geoQuery(parseFloat(lat), parseFloat(lng), parseFloat(dist));
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
}
