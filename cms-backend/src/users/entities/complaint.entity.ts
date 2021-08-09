import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from './user.entity';

//@Exclude: this decorator help to don't send the attribute in the http response

@Entity({ name: 'complaints' })
export class Complaint {
  @PrimaryGeneratedColumn('uuid', { name: 'complaint_id' })
  complaintId: string;

  @Column({ name: 'title', type: 'varchar', length: 64 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

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

  @Column({ name: 'status', type: 'smallint' })
  status: number;

  @ManyToOne(() => User, (user) => user.complaints)
  @JoinColumn({ name: 'user_id' })
  userId: User;
}
