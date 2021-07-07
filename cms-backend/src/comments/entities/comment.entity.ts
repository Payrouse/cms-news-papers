import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
} from 'typeorm';

import { Exclude } from 'class-transformer';

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
}
