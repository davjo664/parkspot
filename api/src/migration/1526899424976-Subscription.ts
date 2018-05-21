import {MigrationInterface, QueryRunner} from 'typeorm';

export class subscription1526899424976 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "subscription_entity" ("id" SERIAL NOT NULL, "parkSpotId" integer, "userId" integer, CONSTRAINT "PK_a98819993766819c043b332748d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "subscription_entity" ADD CONSTRAINT "FK_846f96b1f59ba3836c00997ab7a" FOREIGN KEY ("parkSpotId") REFERENCES "park_spot_entity"("id")`);
    await queryRunner.query(`ALTER TABLE "subscription_entity" ADD CONSTRAINT "FK_1de6c48093b2c28a389d94ee2f8" FOREIGN KEY ("userId") REFERENCES "user_entity"("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "subscription_entity" DROP CONSTRAINT "FK_1de6c48093b2c28a389d94ee2f8"`);
    await queryRunner.query(`ALTER TABLE "subscription_entity" DROP CONSTRAINT "FK_846f96b1f59ba3836c00997ab7a"`);
    await queryRunner.query(`DROP TABLE "subscription_entity"`);
  }

}
