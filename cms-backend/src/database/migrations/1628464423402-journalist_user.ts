import {MigrationInterface, QueryRunner} from "typeorm";

export class journalistUser1628464423402 implements MigrationInterface {
    name = 'journalistUser1628464423402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "journalist" RENAME COLUMN "journalist_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "journalist" RENAME CONSTRAINT "PK_8fdaa3fb9bacbca53358525ff3d" TO "PK_442de0b98c2ef3c622086167376"`);
        await queryRunner.query(`ALTER TABLE "journalist" RENAME CONSTRAINT "UQ_8fdaa3fb9bacbca53358525ff3d" TO "UQ_442de0b98c2ef3c622086167376"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_442de0b98c2ef3c622086167376" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_442de0b98c2ef3c622086167376"`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journalist" RENAME CONSTRAINT "UQ_442de0b98c2ef3c622086167376" TO "UQ_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "journalist" RENAME CONSTRAINT "PK_442de0b98c2ef3c622086167376" TO "PK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "journalist" RENAME COLUMN "user_id" TO "journalist_id"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
