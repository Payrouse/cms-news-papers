import {
  HttpStatus,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from './../dtos/user.dto';
import { UserToRole } from '../entities/userToRole.entity';
import { Role } from './../entities/role.entity';
import { RoleEnum } from 'src/auth/models/roles.model';
import { UserInformation } from './ResponseHelpers';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserToRole)
    private userToRoleRepo: Repository<UserToRole>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private connection: Connection,
  ) {}

  async getUserRoles (userId: string){
    let roles = await this.userToRoleRepo.find({where:{userId}})
    let userRoles = roles.map(rol => rol.roleId)
    return userRoles
  }

  async findAll() {
    const users = await this.userRepo.find();
    const res = users.map(async(user):Promise<UserInformation> => {
      let userRoles = await this.getUserRoles(user.userId)
      return{
        userId: user.userId,
        userName: user.userName,
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photoUrl: user.avatar,
        createdAt: new Date(user.createdAt).toISOString().replace('T',' ').replace('Z',''),
        status: 0,
        role: userRoles
      }
    })

    if(!res){
      throw new Error("Something went wrong")
    }

    return Promise.all(res)
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  findById(id: string) {
    return this.userRepo.findOne({
      where: { userId: id },
    });
  }

  isRegistered(id: string) {
    if (!this.findById(id)) {
      throw new Error('User Not Found');
    }
    return true;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    // hash the password
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    return await this.userRepo.save(newUser);
  }

  async update(userId: string, change: UpdateUserDto) {
    const user = await this.userRepo.findOne(userId);
    this.userRepo.merge(user, change);
    try {
      return this.userRepo.save(user);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async getUserByToken(id: string) {
    const user = await this.userRepo.findOne({
      where: { userId: id },
    });
    const { email, firstName, lastName, avatar, userId } = user;
    const roles = await user.userToRoles;
    // TODO: change roles to array string
    const listRoles = roles.map((role) => role.roleId);
    const isAdministrative = isAdministrativeUser(listRoles);

    return {
      user: {
        sub: userId,
        email,
        firstName,
        lastName,
        avatar,
        roles: listRoles,
        isAdministrative,
      },
    };
  }

  async updatePassword(userId: string, data: ChangePasswordDto) {
    const user = await this.userRepo.findOne(userId);
    if (user) {
      const isMatch = await bcrypt.compare(data.oldPassword, user.password);
      if (!isMatch) {
        throw new HttpException(
          'Contraseña actual no es correcta',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(data.newPassword, 10);
      user.password = hashPassword;
      try {
        return this.userRepo.save(user);
      } catch (error) {
        throw new HttpException(
          'Error al actualizar la contraseña',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    throw new NotFoundException('El usuario no existe o ha sido eliminado');
  }
}

const isAdministrativeUser = (roles: number[]) => {
  let i = 0;
  let found = false;
  while (i < roles.length && !found) {
    if (
      roles[i] === RoleEnum.ADMIN ||
      roles[i] === RoleEnum.PUBLISHER ||
      roles[i] === RoleEnum.JOURNALIST
    ) {
      found = true;
    }
    i++;
  }
  return found;
};
