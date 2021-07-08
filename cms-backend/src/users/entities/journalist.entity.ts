import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

//@Exclude: this decorator help to don't send the attribute in the http response

@Entity({ name: 'journalist' })
export class Journalist {
  /* @PrimaryGeneratedColumn('uuid', { name: 'journalist_id' })
  journalistId: string;*/

  @Column({ name: 'dni', type: 'varchar', length: 10 })
  dni: string;

  @Column({ name: 'social_security_number', type: 'varchar', length: 10 })
  socialSecurityNumber: string;

  @Column({ name: 'public_email', type: 'varchar', length: 255 })
  publicEmail: string;

  @Column({ name: 'branch', type: 'varchar', length: 64 })
  branch: string;

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

  @OneToOne(() => User, (user) => user.journalist, { primary: true })
  @JoinColumn({ name: 'journalist_id' })
  user: User;
}
