import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Streaming } from './streaming.entity';

import { User } from './user.entity';

@Entity({ name: 'administrators' })
export class Administrator {
  @Column({ name: 'phone_number', type: 'varchar', length: 10 })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.administrator, { primary: true })
  @JoinColumn({ name: 'administrator_id' })
  user: User;

  // admin -> streaming
  @OneToMany(() => Streaming, (stream) => stream.administrator)
  streamings: Streaming[];
}
