import {MigrationInterface, QueryRunner} from 'typeorm';
import {randomBool} from '../utils/random-bool';
import * as _ from 'lodash';
import {randomIntegerBetween} from '../utils/random-integer-between';
import {isDev} from '../utils/migration-env';

export class parkingLotMockData1524389626834 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    if (isDev()) {

      await queryRunner.query(`INSERT INTO "public"."parking_lot_entity" ("id", "name") VALUES (1, 'Stuttgart 21 Parkinglot');`);
      await queryRunner.query(`INSERT INTO "public"."parking_lot_entity" ("id", "name") VALUES (2, 'Park n Ride Amsterdam');`);

      const stuttgart = {
        lat: 48.773496,
        lng: 9.177188,
        id: 1,
      };
      const amsterdam = {
        lat: 52.370216,
        lng: 4.895168,
        id: 2,
      };
      const amout = 5;
      await Promise.all([
        ..._.times(amout, () => createOne(stuttgart)),
        ..._.times(amout, () => createOne(amsterdam))
      ]
        .map(it => queryRunner.query(it)));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (isDev()) {
      await queryRunner.query('DELETE FROM park_spot_entity WHERE parkingLotId = 1;');
    }
  }
}


function createOne(city: { lat: number, lng: number, id: number, }): string {
  const availabe: string = randomBool() ? 'true' : 'false';
  const electricCharger: string = randomBool() ? 'true' : 'false';
  const handicapped: string = randomBool() ? 'true' : 'false';
  const lat: number = city.lat - randomIntegerBetween(-10, 10) / 50000;
  const lng: number = city.lng - randomIntegerBetween(-10, 10) / 50000;

  return `INSERT INTO "public"."park_spot_entity" ("id", "available", "electricCharger", "imageURL", "lat", "lng", "handicapped", "parkingLotId") VALUES (DEFAULT, ${availabe}, ${electricCharger}, 'example.jpg', ${lat}, ${lng}, ${handicapped}, ${city.id});`;
}
