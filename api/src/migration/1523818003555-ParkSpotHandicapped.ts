import {MigrationInterface, QueryRunner} from "typeorm";

export class ParkSpotHandicapped1523818003555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ADD "handicapped" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" DROP "handicapped"`);
    }

}
