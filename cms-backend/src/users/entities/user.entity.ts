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
import { Publisher } from './publisher.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { UserToRole } from './userToRole.entity';
import { Administrator } from './administrator.entity';

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

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({
    name: 'avatar',
    type: 'text',
    nullable: true,
    default: 'https://image.flaticon.com/icons/png/512/234/234635.png',
  })
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

  @OneToOne(() => Publisher, (publisher) => publisher.user)
  publisher: Publisher;

  @OneToOne(() => Administrator, (administrator) => administrator.adminId)
  administrator: Administrator;

  @OneToMany(() => Complaint, (complaint) => complaint.userId)
  complaints: Complaint[];

  // user -> comment
  @OneToMany(() => Comment, (comment) => comment.userId)
  comments: Comment[];

  @OneToMany(() => UserToRole, (userToRole) => userToRole.user)
  userToRoles: Promise<UserToRole[]>;
}
