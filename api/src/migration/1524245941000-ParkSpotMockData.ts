import {MigrationInterface, QueryRunner} from 'typeorm';
import {isDev} from '../utils/migration-env';
import {randomIntegerBetween} from '../utils/random-integer-between';
import {randomBool} from '../utils/random-bool';
import * as _ from 'lodash';

export class parkSpotMockData1524245941000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    if (isDev()) {
      const stuttgart = {
        lat: 48.773496,
        lng: 9.177188,
      };
      const amsterdam = {
        lat: 52.370216,
        lng: 4.895168,
      };
      const amout = 25;
      await Promise.all([
        ..._.times(amout, () => createOne(stuttgart)),
        ..._.times(amout, () => createOne(amsterdam))
      ]
        .map(it => queryRunner.query(it)));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (isDev()) {
      await queryRunner.query('DELETE FROM park_spot_entity;');
    }
  }
}


function createOne(city: { lat: number, lng: number }): string {
  const availabe: string = randomBool() ? 'true' : 'false';
  const electricCharger: string = randomBool() ? 'true' : 'false';
  const handicapped: string = randomBool() ? 'true' : 'false';
  const lat: number = city.lat - randomIntegerBetween(-10, 10) / 1000;
  const lng: number = city.lng - randomIntegerBetween(-10, 10) / 1000;

  return `INSERT INTO "public"."park_spot_entity" ("id", "available", "electricCharger", "imageURL", "lat", "lng", "handicapped") VALUES (DEFAULT, ${availabe}, ${electricCharger}, 'example.jpg', ${lat}, ${lng}, ${handicapped});`;
}
