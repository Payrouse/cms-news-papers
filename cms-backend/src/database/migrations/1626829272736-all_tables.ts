import {MigrationInterface, QueryRunner} from "typeorm";

export class allTables1626829272736 implements MigrationInterface {
    name = 'allTables1626829272736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "UQ_8fdaa3fb9bacbca53358525ff3d" UNIQUE ("journalist_id")`);
        await queryRunner.query(`ALTER TABLE "publishers" DROP CONSTRAINT "FK_d25990ded6d8012396ef6c10767"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_e806367428ff22eaaa06adc99ac"`);
        await queryRunner.query(`ALTER TABLE "publishers" ADD CONSTRAINT "UQ_d25990ded6d8012396ef6c10767" UNIQUE ("publisher_id")`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "UQ_cdebf73ab236f3b38fa1b3e2373" UNIQUE ("administrator_id")`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publishers" ADD CONSTRAINT "FK_d25990ded6d8012396ef6c10767" FOREIGN KEY ("publisher_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_e806367428ff22eaaa06adc99ac" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_e806367428ff22eaaa06adc99ac"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "publishers" DROP CONSTRAINT "FK_d25990ded6d8012396ef6c10767"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "UQ_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publishers" DROP CONSTRAINT "UQ_d25990ded6d8012396ef6c10767"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_e806367428ff22eaaa06adc99ac" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publishers" ADD CONSTRAINT "FK_d25990ded6d8012396ef6c10767" FOREIGN KEY ("publisher_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "UQ_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
