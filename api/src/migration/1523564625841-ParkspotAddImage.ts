import {MigrationInterface, QueryRunner} from "typeorm";

export class ParkspotAddImage1523564625841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" ADD "imageURL" character varying DEFAULT 'example.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."park_spot_entity" DROP "imageURL"`);
    }

}
