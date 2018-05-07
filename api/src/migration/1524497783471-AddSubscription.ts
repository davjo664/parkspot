import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubscription1524497783471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription_entity" ("parkspotId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e745331b198f55f86bacd671737" PRIMARY KEY ("parkspotId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "subscription_entity"`);
    }

}
