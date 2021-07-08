import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaints } from '../entities/complaints.entity';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaints)
    private complaintRepo: Repository<Complaints>,
  ) {}

  findAll() {
    return this.complaintRepo.find();
  }
}
