import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Comment } from '../../comments/entities/comment.entity';
import { Journalist } from '../../users/entities/journalist.entity';
import { Publisher } from '../../users/entities/publisher.entity';
import { Category } from './category.entity';

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

  @Column({ name: 'status', type: 'smallint', default: 0 })
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

  // journalist -> article (FK)
  @ManyToOne(() => Journalist, (journalist) => journalist.article)
  @JoinColumn({ name: 'journalist_id' })
  journalistId: string;

  // article -> publisher
  @ManyToOne(() => Publisher, (publisher) => publisher.articles)
  @JoinColumn({ name: 'publisher_id' })
  publisherId: string;

  // article -> comment
  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  // article -> category
  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn({ name: 'category_id' })
  categoryId: string;
}
