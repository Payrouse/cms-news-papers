import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Exclude } from 'class-transformer';

import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'user_roles' })
export class UserToRole {
	@PrimaryColumn({ name: 'user_id' })
	userId: string;
	
	@PrimaryColumn({ name: 'role_id' })
	roleId: string;

	@Exclude()
	@CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
	createdAt: Date;

	@Exclude()
	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.userToRoles)
	user: User;

	@ManyToOne(() => Role, (role) => role.userToRoles)
	role: Role;
}
