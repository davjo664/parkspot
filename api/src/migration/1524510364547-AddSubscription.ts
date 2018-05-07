import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubscription1524510364547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP CONSTRAINT "PK_e745331b198f55f86bacd671737"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP COLUMN "parkspotId"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD CONSTRAINT "PK_a98819993766819c043b332748d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD "parkSpotId" integer`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD CONSTRAINT "FK_846f96b1f59ba3836c00997ab7a" FOREIGN KEY ("parkSpotId") REFERENCES "park_spot_entity"("id")`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD CONSTRAINT "FK_1de6c48093b2c28a389d94ee2f8" FOREIGN KEY ("userId") REFERENCES "user_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP CONSTRAINT "FK_1de6c48093b2c28a389d94ee2f8"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP CONSTRAINT "FK_846f96b1f59ba3836c00997ab7a"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP COLUMN "parkSpotId"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP CONSTRAINT "PK_a98819993766819c043b332748d"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD "parkspotId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription_entity" ADD CONSTRAINT "PK_e745331b198f55f86bacd671737" PRIMARY KEY ("parkspotId")`);
    }

}
