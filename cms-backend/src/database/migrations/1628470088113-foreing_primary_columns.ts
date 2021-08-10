import {MigrationInterface, QueryRunner} from "typeorm";

export class foreingPrimaryColumns1628470088113 implements MigrationInterface {
    name = 'foreingPrimaryColumns1628470088113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "publisher_id" uuid`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "journalist" ALTER COLUMN "journalist_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_c6b69d5205c5bf6329ed2fc0822" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_c6b69d5205c5bf6329ed2fc0822"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE SEQUENCE "journalist_journalist_id_seq" OWNED BY "journalist"."journalist_id"`);
        await queryRunner.query(`ALTER TABLE "journalist" ALTER COLUMN "journalist_id" SET DEFAULT nextval('journalist_journalist_id_seq')`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "publisher_id"`);
    }

}
