import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/auth/models/roles.model';
import { Connection, Repository } from 'typeorm';
import { CreatePublisherDto, UpdatePublisherDto } from '../dtos/publisher.dto';
import { Publisher } from '../entities/publisher.entity';
import { Role } from '../entities/role.entity';
import { UserToRole } from '../entities/userToRole.entity';
import { UsersService } from './users.service';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepo: Repository<Publisher>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(UserToRole)
    private userToRoleRepo: Repository<UserToRole>,
    private userService: UsersService,
    private connection: Connection,
  ) {}

  findAll(){
    return this.publisherRepo.find()
  }

  async createPublisher(data: CreatePublisherDto) {
    const User = await this.userService.findById(data.userId);
    const newPublisher = this.publisherRepo.create({
      section: data.section,
      user: User,
    });

    const transaction = this.connection.createQueryRunner();
    await transaction.connect();

    await transaction.startTransaction();

    try {
      const publisher = await transaction.manager.save(newPublisher);
      const role = await this.roleRepo.findOne({
        where: { roleId: RoleEnum.PUBLISHER },
      });

      const userToRole = this.userToRoleRepo.create({
        roleId: role.roleId,
        userId: publisher.publisherId
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

    return 'Publisher Created Successfully';
  }

  async update(data: UpdatePublisherDto) {
    const publisher = await this.publisherRepo.findOne(data.publisherId)
    if (!publisher)
      throw new HttpException('Publisher Not Found', HttpStatus.NOT_FOUND);
    this.publisherRepo.merge(publisher, data);
    try {
      this.publisherRepo.save(publisher);
      return `Publisher Updated`;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el publicador',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
