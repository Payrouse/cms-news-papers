import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/auth/models/roles.model';
import { Connection, Repository } from 'typeorm';
import { CreateJournalistDto, UpdateJournalistDto } from '../dtos/journalist.dto';
import { Journalist } from '../entities/journalist.entity';
import { Role } from '../entities/role.entity';
import { UserToRole } from '../entities/userToRole.entity';
import { UsersService } from './users.service';

@Injectable()
export class JournalistsService {
  constructor(
    @InjectRepository(Journalist)
    private journalistRepo: Repository<Journalist>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(UserToRole)
    private userToRoleRepo: Repository<UserToRole>,
    private connection: Connection,
    private userService: UsersService,
  ) {}

  findAll() {
    return this.journalistRepo.find();
  }

  async createJournalist(data: CreateJournalistDto) {
    const User = await this.userService.findById(data.userId);
    const newJournalist = this.journalistRepo.create({
      dni: data.dni,
      socialSecurityNumber: data.socialSecurityNumber,
      publicEmail: data.publicEmail,
      branch: data.branch,
      user: User,
    });

    const transaction = this.connection.createQueryRunner();
    await transaction.connect();

    await transaction.startTransaction();

    try {
      const journalist =  await transaction.manager.save(newJournalist);
      const role = await this.roleRepo.findOne({
        where: { roleId: RoleEnum.JOURNALIST },
      });

      const userToRole = this.userToRoleRepo.create({
        roleId: role.roleId,
        userId: journalist.journalistId,
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

    return 'Journalist Created Successfully';
  }

  async update(data: UpdateJournalistDto) {
    const journalist = await this.journalistRepo.findOne(data.journalistId)
    if (!journalist)
      throw new HttpException('Journalist Not Found', HttpStatus.NOT_FOUND);
    this.journalistRepo.merge(journalist, data);
    try {
      this.journalistRepo.save(journalist);
      return `Journalist Updated`;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el periodista',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
