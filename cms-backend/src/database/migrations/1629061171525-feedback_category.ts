import {MigrationInterface, QueryRunner} from "typeorm";

export class feedbackCategory1629061171525 implements MigrationInterface {
    name = 'feedbackCategory1629061171525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "url" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_6c2db5b469e69e89088bad33b2b" UNIQUE ("url")`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "feedback" text`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_c6b69d5205c5bf6329ed2fc0822"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "publisher_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "streamings" ALTER COLUMN "administrator_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_e025eeefcdb2a269c42484ee43f"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "title" character varying(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "subtitle"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "subtitle" character varying(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "published_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "journalist_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "category_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_c6b69d5205c5bf6329ed2fc0822" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_e025eeefcdb2a269c42484ee43f" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_e025eeefcdb2a269c42484ee43f"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_92a647722939d26ae371ec8c208"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373"`);
        await queryRunner.query(`ALTER TABLE "streamings" DROP CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_c6b69d5205c5bf6329ed2fc0822"`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "category_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "journalist_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "published_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "subtitle"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "subtitle" character varying(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "title" character varying(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_e025eeefcdb2a269c42484ee43f" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_92a647722939d26ae371ec8c208" FOREIGN KEY ("journalist_id") REFERENCES "journalist"("journalist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_cdebf73ab236f3b38fa1b3e2373" FOREIGN KEY ("administrator_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "streamings" ALTER COLUMN "administrator_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "streamings" ADD CONSTRAINT "FK_dd9f9828fe1256afe75f86e59f9" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("administrator_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "publisher_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_c6b69d5205c5bf6329ed2fc0822" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "feedback"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_6c2db5b469e69e89088bad33b2b"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "url"`);
    }

}
