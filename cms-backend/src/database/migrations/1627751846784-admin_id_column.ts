import {MigrationInterface, QueryRunner} from "typeorm";

export class adminIdColumn1627751846784 implements MigrationInterface {
    name = 'adminIdColumn1627751846784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "streamings" ADD "administrator_id" uuid`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP COLUMN "administrator_id"`);
    }

}
