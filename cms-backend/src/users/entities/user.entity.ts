import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Journalist } from './journalist.entity';
import { Complaint } from './complaint.entity';
import { Comment } from 'src/comments/entities/comment.entity';

// @Exclude: this decorator help to don't send the attribute in the http response

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'user_name', type: 'varchar', length: 32 })
  userName: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({ name: 'avatar', type: 'text', nullable: true })
  avatar: string;

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

  @OneToOne(() => Journalist, (journalist) => journalist.user)
  journalist: Journalist;

  @OneToMany(() => Complaint, (complaint) => complaint.user)
  complaints: Complaint[];

  // user -> comment
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
