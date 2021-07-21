import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserToRole } from './userToRole.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('increment', { name: 'role_id' })
  roleId: number;

  @Column({ name: 'name', type: 'varchar', length: 16 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
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

  @OneToMany(() => UserToRole, (userToRole) => userToRole.role)
  userToRoles: UserToRole[];
}
