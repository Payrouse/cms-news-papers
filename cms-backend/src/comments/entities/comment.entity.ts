import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

import { User } from 'src/users/entities/user.entity';
import { Article } from './../../articles/entities/article.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  commentId: string;

  @Column({ name: 'body', type: 'varchar', length: 255 })
  body: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // redundant relation (FK)
  @ManyToOne(() => Comment, (comment) => comment.commentRoot, {
    nullable: true,
  })
  @JoinColumn({ name: 'comment_root_id' })
  commentRoot: Comment;

  // user -> comment (FK)
  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  userId: User;

  // article -> comment (FK)
  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn({ name: 'article_id' })
  articleId: Article;
}
