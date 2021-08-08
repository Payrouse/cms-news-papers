import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Streaming } from './streaming.entity';

import { User } from './user.entity';

@Entity({ name: 'administrators' })
export class Administrator {
  @Column({ name: 'phone_number', type: 'varchar', length: 10 })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.administrator, { primary: true })
  @JoinColumn({ name: 'administrator_id' })
  adminId: User;

  // admin -> streaming
  @OneToMany(() => Streaming, (streaming) => streaming.administratorId)
  streamings: Streaming[];
}
