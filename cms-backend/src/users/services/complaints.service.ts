import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  ChangeComplaintStatusDto,
  CreateComplaintDto,
} from '../dtos/complaints.dto';
import { Complaint } from '../entities/complaint.entity';
import { ComplaintStatus } from '../models/ComplaintEnum';
import { UsersService } from './users.service';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepo: Repository<Complaint>,
    private userService: UsersService,
    private connection: Connection,
  ) {}

  findAll() {
    return this.complaintRepo.find();
  }

  findPublished() {
    return this.complaintRepo.find({ status: ComplaintStatus.PUBLIC });
  }

  async createComplaint(userId: string, data: CreateComplaintDto) {
    const User = await this.userService.findById(userId);
    const newComplaint = this.complaintRepo.create({
      title: data.title,
      description: data.description,
      status: ComplaintStatus.SUBMITTED,
      userId: User,
    });

    const transaction = this.connection.createQueryRunner();
    await transaction.connect();

    await transaction.startTransaction();

    try {
      await transaction.manager.save(newComplaint);
      await transaction.commitTransaction();
    } catch (err) {
      await transaction.rollbackTransaction();
      console.error(err.message);
      return { err };
    } finally {
      await transaction.release();
    }

    return 'Complaint Created Successfully';
  }

  async changeComplaintStatus(
    complaintId: string,
    status: ChangeComplaintStatusDto,
  ) {
    const complaint = await this.complaintRepo.findOne(complaintId);
    if (!complaint)
      throw new HttpException('Complaint Not Found', HttpStatus.NOT_FOUND);
    this.complaintRepo.merge(complaint, status);
    try {
      this.complaintRepo.save(complaint);
      return `The complaint is ${ComplaintStatus[status.status]}`;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar la denuncia ciudadana',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(complaintId: string) {
    const stream = await this.complaintRepo.findOne(complaintId);
    if (!stream)
      throw new HttpException('Complaint Not Found', HttpStatus.NOT_FOUND);
    try {
      await this.complaintRepo.delete(complaintId);
      return `Complaint Deleted`;
    } catch (error) {
      throw new HttpException(
        'Error al eliminar la denuncia',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
