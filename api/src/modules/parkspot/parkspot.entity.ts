import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';

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
}
