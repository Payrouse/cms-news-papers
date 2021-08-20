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
import { Exclude, Expose } from 'class-transformer';

import { Comment } from '../../comments/entities/comment.entity';
import { Journalist } from '../../users/entities/journalist.entity';
import { Publisher } from '../../users/entities/publisher.entity';
import { Category } from './category.entity';
import { Max, Min } from 'class-validator';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn('uuid', { name: 'article_id' })
  articleId: string;

  @Column({ name: 'title', type: 'text', unique: true })
  title: string;

  @Column({ name: 'subtitle', type: 'text' })
  subtitle: string;

  @Column({ name: 'keywords', type: 'text' })
  keywords: string;

  @Column({ name: 'picture', type: 'text' })
  picture: string;

  @Column({ name: 'feedback', type: 'text', nullable: true })
  feedback: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'status', type: 'smallint', default: 0 })
  @Min(0)
  @Max(4)
  status: number;

  // @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'published_at',
    type: 'timestamptz',
    nullable: true,
  })
  publishedAt: Date;

  // journalist -> article (FK)
  @ManyToOne(() => Journalist, (journalist) => journalist.article, {
    nullable: false,
  })
  @JoinColumn({ name: 'journalist_id' })
  journalistId: string | Journalist;

  // article -> publisher
  @ManyToOne(() => Publisher, (publisher) => publisher.articles)
  @JoinColumn({ name: 'publisher_id' })
  publisherId: string;

  // article -> comment
  @OneToMany(() => Comment, (comment) => comment.articleId)
  comments: Comment[];

  // article -> category
  @Exclude()
  @ManyToOne(() => Category, (category) => category.articles, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  categoryId: string | Category;

  @Expose()
  get category() {
    if (this.categoryId) {
      const category = this.categoryId.valueOf() as Category;
      return {
        name: category.name,
        url: category.url,
        description: category.description,
        categoryId: category.categoryId,
      };
    }
    return [];
  }

  @Expose()
  get author() {
    if (this.journalistId) {
      if (typeof this.journalistId === 'string') return null;
      const journalist = this.journalistId.valueOf() as Journalist;
      return {
        firstName: journalist.user.firstName,
        lastName: journalist.user.lastName,
        avatar: journalist.user.avatar,
        email: journalist.user.email,
      };
    }
    return null;
  }
}
