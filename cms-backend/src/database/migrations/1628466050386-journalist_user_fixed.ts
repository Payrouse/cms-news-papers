import {MigrationInterface, QueryRunner} from "typeorm";

export class journalistUserFixed1628466050386 implements MigrationInterface {
    name = 'journalistUserFixed1628466050386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_442de0b98c2ef3c622086167376"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_904585522e2ff93dcd384b78c91"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "PK_ea54507c5379df6b566a3f9894f"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "PK_8fdaa3fb9bacbca53358525ff3d" PRIMARY KEY ("journalist_id")`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "UQ_442de0b98c2ef3c622086167376"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "UQ_8fdaa3fb9bacbca53358525ff3d" UNIQUE ("journalist_id")`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "UQ_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "UQ_442de0b98c2ef3c622086167376" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "PK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "PK_ea54507c5379df6b566a3f9894f" PRIMARY KEY ("user_id", "journalist_id")`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_904585522e2ff93dcd384b78c91" FOREIGN KEY ("journalist_id", "journalist_id") REFERENCES "journalist"("journalist_id","user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_442de0b98c2ef3c622086167376" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
