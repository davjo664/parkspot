import {Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationCount} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {ParkSpotEntity} from '../parkspot/parkspot.entity';

@Entity()
export class ParkingLotEntity {

  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  name: string;


  @OneToMany(type => ParkSpotEntity, parkspot => parkspot.parkingLot, {eager: false})
  parkSpotEntities: Promise<ParkSpotEntity[]>;

  // If RelationCount is deprecated with version 0.3.0 of TypeORM use this instead:
  //https://github.com/typeorm/typeorm/issues/1722#issuecomment-371735802
  @RelationCount(
    (lot: ParkingLotEntity) => lot.parkSpotEntities, 'spot', qb => qb.andWhere('spot.available = :available', {available: true}))
  available: number;

  @RelationCount((lot: ParkingLotEntity) => lot.parkSpotEntities, 'spot', qb => qb.andWhere('spot.available = :available AND spot.handicapped = :handicapped', {
    available: true,
    handicapped: true
  }))
  availableHandicapped: number;

  @RelationCount((lot: ParkingLotEntity) => lot.parkSpotEntities, 'spot', qb => qb.andWhere('spot.available = :available AND spot.electricCharger = :electricCharger', {
    available: true,
    electricCharger: true
  }))
  availableElectric: number;


  @RelationCount((lot: ParkingLotEntity) => lot.parkSpotEntities, 'spot')
  total: number;

  @RelationCount((lot: ParkingLotEntity) => lot.parkSpotEntities, 'spot', qb => qb.andWhere('spot.handicapped = :handicapped', {handicapped: true}))
  totalHandicapped: number;

  @RelationCount((lot: ParkingLotEntity) => lot.parkSpotEntities, 'spot', qb => qb.andWhere('spot.electricCharger = :electricCharger', {electricCharger: true}))
  totalElectric: number;

}
