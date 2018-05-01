import {Controller, Get, HttpStatus, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {ParkingLotService} from './parking-lot.service';
import {ParkingLotEntity} from './parking-lot.entity';

@ApiUseTags('parking-lot')
@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {
  }


  @Get('/:id')
  @ApiOperation({
    description: 'Meta information is attached, but not the ParkingSpots.',
    title: 'Get a specific Parkinglot'
  })
  @ApiResponse({status: HttpStatus.OK, description: 'Returns a single ParkingLot', type: ParkingLotEntity})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Parking Lot with that id doesnt exist'})
  async get(@Param('id') id: number): Promise<ParkingLotEntity> {
    return await this.parkingLotService.findOne(id);
  }

}
