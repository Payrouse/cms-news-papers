import {MigrationInterface, QueryRunner} from "typeorm";

export class creationcomplaintsuser1625712294221 implements MigrationInterface {
    name = 'creationcomplaintsuser1625712294221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("article_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(12) NOT NULL, "subtitle" character varying(24) NOT NULL, "keywords" text NOT NULL, "picture" text NOT NULL, "body" text NOT NULL, "status" smallint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "published_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b9a16e8d0dc20426e1611e560bc" PRIMARY KEY ("article_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "journalist" ("dni" character varying(10) NOT NULL, "social_security_number" character varying(10) NOT NULL, "public_email" character varying(255) NOT NULL, "branch" character varying(64) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "journalist_id" uuid NOT NULL, CONSTRAINT "REL_8fdaa3fb9bacbca53358525ff3" UNIQUE ("journalist_id"), CONSTRAINT "PK_8fdaa3fb9bacbca53358525ff3d" PRIMARY KEY ("journalist_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(32) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" text NOT NULL, "avatar" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "complaints" ("complaint_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(64) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_54a4ae55447dd6c4bfbc0a3a462" PRIMARY KEY ("complaint_id"))`);
        await queryRunner.query(`CREATE TABLE "streamings" ("stream_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "video_url" text NOT NULL, "closed_at" TIME WITH TIME ZONE NOT NULL, "status" smallint NOT NULL, CONSTRAINT "PK_59d627841a72a96c5eef72aed97" PRIMARY KEY ("stream_id"))`);
        await queryRunner.query(`ALTER TABLE "journalist" ADD CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d" FOREIGN KEY ("journalist_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaints" ADD CONSTRAINT "FK_250ea1d40f7a564243d77705e09" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complaints" DROP CONSTRAINT "FK_250ea1d40f7a564243d77705e09"`);
        await queryRunner.query(`ALTER TABLE "journalist" DROP CONSTRAINT "FK_8fdaa3fb9bacbca53358525ff3d"`);
        await queryRunner.query(`DROP TABLE "streamings"`);
        await queryRunner.query(`DROP TABLE "complaints"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "journalist"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
