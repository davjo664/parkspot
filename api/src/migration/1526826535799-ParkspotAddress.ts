import {MigrationInterface, QueryRunner} from 'typeorm';

export class parkspotAddress1526826535799 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "street" character varying NOT NULL DEFAULT ' ';`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "houseNumber" character varying NOT NULL DEFAULT ' ';`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "city" character varying NOT NULL DEFAULT ' ';`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "country" character varying NOT NULL DEFAULT ' ';`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "postalCode" character varying NOT NULL DEFAULT ' ';`);
    await queryRunner.query(`
        
UPDATE park_spot_entity
SET
  street        = 'Wolframstraße',
  city          = 'Stuttgart',
  country       = 'Germany',
  "postalCode"  = '70191',
  "houseNumber" = '32'
WHERE lng > 6;




UPDATE park_spot_entity
SET
  street        = 'Warmoesstraat',
  city          = 'Amsterdam',
  country       = 'Netherlands',
  "postalCode"  = '1012 JA ',
  "houseNumber" = '129'
WHERE lng < 6;


alter table park_spot_entity alter column  street  DROP DEFAULT;
alter table park_spot_entity alter column  city  DROP DEFAULT;
alter table park_spot_entity alter column  country  DROP DEFAULT;
alter table park_spot_entity alter column  "postalCode"  DROP DEFAULT;
alter table park_spot_entity alter column  "houseNumber"  DROP DEFAULT;


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "postalCode"`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "houseNumber"`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "street"`);
  }

}
