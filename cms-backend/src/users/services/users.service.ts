import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './../dtos/user.dto';
import { UserToRole } from '../entities/userToRole.entity';
import { Role } from './../entities/role.entity';
import { RoleEnum } from 'src/auth/models/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserToRole)
    private userToRoleRepo: Repository<UserToRole>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private connection: Connection,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    // hash the password
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    return await this.userRepo.save(newUser);
  }

  async registerUser(data: CreateUserDto) {
    // create user
    const newUser = this.userRepo.create(data);
    // hash the password
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    // instanced the transaction
    const transaction = this.connection.createQueryRunner();
    await transaction.connect();
    // start the transaction
    await transaction.startTransaction();
    try {
      // save the user
      const user = await transaction.manager.save(newUser);

      // get id role
      const role = await this.roleRepo.findOne({
        where: { roleId: RoleEnum.USER },
      });

      // create userToRole
      const userToRole = this.userToRoleRepo.create({
        roleId: role.roleId,
        userId: user.userId,
      });

      // save the userToRole
      await transaction.manager.save(userToRole);
      // commit the transaction
      await transaction.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await transaction.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await transaction.release();
    }

    return newUser;
  }
}
