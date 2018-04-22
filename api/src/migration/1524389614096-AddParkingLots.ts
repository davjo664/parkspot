import {MigrationInterface, QueryRunner} from 'typeorm';

export class addParkingLots1524389614096 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "parking_lot_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_68141f725c9e2311f55ef87bd5c" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "parkingLotId" integer`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD CONSTRAINT "FK_5354212b8d8a0221b0af34fb1ca" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lot_entity"("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP CONSTRAINT "FK_5354212b8d8a0221b0af34fb1ca"`);
    await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "parkingLotId"`);
    await queryRunner.query(`DROP TABLE "parking_lot_entity"`);
  }

}
