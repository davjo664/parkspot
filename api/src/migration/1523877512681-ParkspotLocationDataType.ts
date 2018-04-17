import {MigrationInterface, QueryRunner} from "typeorm";

export class ParkspotLocationDataType1523877512681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lat" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lng" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lng" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lng" SET NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lng" TYPE numeric`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lat" SET NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."park_spot_entity" ALTER COLUMN "lat" TYPE numeric`);
    }

}
