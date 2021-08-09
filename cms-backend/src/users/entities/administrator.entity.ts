import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Streaming } from './streaming.entity';

import { User } from './user.entity';

@Entity({ name: 'administrators' })
export class Administrator {
  @PrimaryGeneratedColumn('uuid', { name: 'administrator_id' })
  administratorId: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 13 })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.administrator, { primary: true })
  @JoinColumn({ name: 'administrator_id' })
  user: User;

  // admin -> streaming
  @OneToMany(() => Streaming, (stream) => stream.administrator)
  streamings: Streaming[];
}
