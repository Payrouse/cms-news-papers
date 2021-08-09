import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/auth/models/roles.model';
import { Connection, Repository } from 'typeorm';
import {
  CreateAdministratorDto,
  UpdateAdministratorPhoneDto,
} from '../dtos/administrator.dto';
import { Administrator } from '../entities/administrator.entity';
import { Role } from '../entities/role.entity';
import { UserToRole } from '../entities/userToRole.entity';
import { UsersService } from './users.service';

@Injectable()
export class AdministratorsService {
  constructor(
    private userService: UsersService,
    @InjectRepository(UserToRole)
    private userToRoleRepo: Repository<UserToRole>,
    @InjectRepository(Administrator)
    private administratorRepo: Repository<Administrator>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    private connection: Connection,
  ) {}

  async grantAdministrator(data: CreateAdministratorDto) {
    if (!this.userService.isRegistered(data.administratorId)) {
      throw new Error('Cannot grant Admin');
    }
    const newAdministrator = this.administratorRepo.create(data);
    const transaction = this.connection.createQueryRunner();
    await transaction.connect();

    await transaction.startTransaction();
    try {
      const admin = await transaction.manager.save(newAdministrator);

      const role = await this.roleRepo.findOne({
        where: { roleId: RoleEnum.ADMIN },
      });

      const userToRole = this.userToRoleRepo.create({
        roleId: role.roleId,
        userId: admin.administratorId,
      });

      await transaction.manager.save(userToRole);
      await transaction.commitTransaction();
    } catch (err) {
      await transaction.rollbackTransaction();
      console.error(err.message);
      return { err };
    } finally {
      await transaction.release();
    }

    return 'Administrator Granted to User Successfully';
  }

  async update(userId: string, change: UpdateAdministratorPhoneDto) {
    const administrator = await this.administratorRepo.findOne(userId);
    this.administratorRepo.merge(administrator, change);
    try {
      return this.administratorRepo.save(administrator);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el numero de telefono',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPhone(userId: string) {
    const { phoneNumber } = await this.administratorRepo.findOne(userId);
    return phoneNumber;
  }

  async getAdministrator(userId: string) {
    const administrator = await this.administratorRepo.findOne(userId);
    if (!administrator) {
      throw new Error('This user is not an administrator');
    }
    return administrator;
  }
}
