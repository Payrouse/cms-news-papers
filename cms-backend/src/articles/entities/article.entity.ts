import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn('uuid', { name: 'article_id' })
  articleId: string;

  @Column({ name: 'title', type: 'varchar', length: 12 })
  title: string;

  @Column({ name: 'subtitle', type: 'varchar', length: 24 })
  subtitle: string;

  @Column({ name: 'keywords', type: 'text' })
  keywords: string;

  @Column({ name: 'picture', type: 'text' })
  picture: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'status', type: 'smallint' })
  status: number;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @UpdateDateColumn({
    name: 'published_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedAt: Date;
}
