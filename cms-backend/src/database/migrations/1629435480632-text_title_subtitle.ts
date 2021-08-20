import {MigrationInterface, QueryRunner} from "typeorm";

export class textTitleSubtitle1629435480632 implements MigrationInterface {
    name = 'textTitleSubtitle1629435480632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "subtitle"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "subtitle" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "subtitle"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "subtitle" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "title" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
