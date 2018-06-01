import {Component, HttpException, HttpStatus} from '@nestjs/common';
import {ParkspotRepo} from './parkspot-repository.provider';
import {ParkSpotEntity} from './parkspot.entity';
import {ParkSpotQueryParams} from './parkspot.dto';

@Component()
export class ParkspotService {


  constructor(private parkspotRepo: ParkspotRepo) {
  }

  async find(params: ParkSpotQueryParams): Promise<ParkSpotEntity[]> {
    return this.parkspotRepo.find(params);
  }

  async findOne(id: number): Promise<ParkSpotEntity> {
    return this.parkspotRepo.findOne(id);
  }

  async geoQuery(lat: number, lng: number, dist: number): Promise<ParkSpotEntity[]> {
    //TODO create geoQuery with queryBuilder
    // const sub = this.parkspotRepo.createQueryBuilder().
    // return this.parkspotRepo.createQueryBuilder().where("dist > 300").getMany();
    return this.parkspotRepo.query(this.buildGeoQuery(lat, lng, dist));
  }

  async create(parkSpot: ParkSpotEntity): Promise<ParkSpotEntity> {
    try {
      await this.parkspotRepo.insert(parkSpot);
    } catch (e) {
      throw new HttpException(`ParkSpot with id '${parkSpot.id}' already exists`, HttpStatus.CONFLICT);
    }
    return this.parkspotRepo.findOne(parkSpot.id);
  }

  async update(id: number, updateData: Partial<ParkSpotEntity>): Promise<ParkSpotEntity> {
    try {
      await this.parkspotRepo.update(id, updateData);
      return this.parkspotRepo.findOne(id);
    } catch (e) {
      throw new HttpException('ParkSpot with id ' + id + '  does not exist', HttpStatus.NOT_FOUND);
    }
  }

  private buildGeoQuery(lat: number, lng: number, dist: number): string {
    if (typeof lat !== 'number' || typeof lng !== 'number' || typeof dist !== 'number') {
      throw new HttpException('GPS Query Params must be of type number', 500);
    }
    return "SELECT * FROM (SELECT *, (6371 * acos(cos(radians( " + lat + " )) * cos(radians( lat)) * cos(radians(lng) - radians( " + lng + " )) + sin(radians( " + lat + " )) * sin(radians(lat)))) AS dist FROM park_spot_entity) as innerTable WHERE dist < " + dist + " ORDER BY dist ASC";
  }
}
