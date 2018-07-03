import {MigrationInterface, QueryRunner} from 'typeorm';

export class addFilterOptions1530645143001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "priced" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "park_spot_entity" ADD "timeLimit" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "timeLimit"`);
        await queryRunner.query(`ALTER TABLE "park_spot_entity" DROP COLUMN "priced"`);
    }

}
