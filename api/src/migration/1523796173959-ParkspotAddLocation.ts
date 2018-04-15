import {MigrationInterface, QueryRunner} from "typeorm";

export class ParkspotAddLocation1523796173959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ADD "lat" integer`);
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ADD "lng" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" DROP "lng"`);
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" DROP "lat"`);
    }

}
