import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleCommentStreaming1625542389617 implements MigrationInterface {
    name = 'ArticleCommentStreaming1625542389617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("article_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(12) NOT NULL, "subtitle" character varying(24) NOT NULL, "keywords" text NOT NULL, "picture" text NOT NULL, "body" text NOT NULL, "status" smallint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "published_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b9a16e8d0dc20426e1611e560bc" PRIMARY KEY ("article_id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_eb0d76f2ca45d66a7de04c7c72b" PRIMARY KEY ("comment_id"))`);
        await queryRunner.query(`CREATE TABLE "streamings" ("stream_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "video_url" text NOT NULL, "closed_at" TIME WITH TIME ZONE NOT NULL, "status" smallint NOT NULL, CONSTRAINT "PK_59d627841a72a96c5eef72aed97" PRIMARY KEY ("stream_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "streamings"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
