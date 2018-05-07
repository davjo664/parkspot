import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {ParkingLotEntity} from '../parkinglot/parking-lot.entity';
import {SubscriptionEntity} from '../subscription/subscription.entity';

@Entity()
export class ParkSpotEntity {

  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column({ type:'decimal' })
  @ApiModelProperty()
  lat: number;

  @Column({ type:'decimal' })
  @ApiModelProperty()
  lng: number;

  @Column()
  @ApiModelProperty()
  available: boolean;

  @Column()
  @ApiModelProperty()
  electricCharger: boolean;

  @Column()
  @ApiModelProperty()
  handicapped: boolean;

  @Column({ nullable: true, default: "example.jpg"})
  @ApiModelProperty()
  imageURL: string;

  @ManyToOne(type => ParkingLotEntity, {nullable: true,})
  @ApiModelPropertyOptional()
  parkingLot?: ParkingLotEntity | null;

  @OneToMany(type => SubscriptionEntity, subscription => subscription.parkSpot)
  @ApiModelPropertyOptional()
  subscriptions: SubscriptionEntity[];

}
