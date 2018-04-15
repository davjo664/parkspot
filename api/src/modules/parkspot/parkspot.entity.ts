import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class ParkSpotEntity {

  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  lat: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  lng: number;

  @Column()
  @ApiModelProperty()
  available: boolean;

  @Column()
  @ApiModelProperty()
  electricCharger: boolean;

  @Column({ nullable: true, default: "example.jpg"})
  @ApiModelProperty()
  imageURL: string;
}
