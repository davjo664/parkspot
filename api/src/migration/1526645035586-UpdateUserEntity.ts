import {MigrationInterface, QueryRunner} from 'typeorm';

export class updateUserEntity1526645035586 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE Table user_entity CASCADE`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "uk_user_entity_mail"`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "mail"`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "userLevel"`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "fcmToken" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "fcmTokenType" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "fcmTokenType"`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "fcmToken"`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "userLevel" integer NOT NULL DEFAULT 1`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "password" character varying(60) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "mail" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "uk_user_entity_mail" UNIQUE ("mail")`);
  }

}
