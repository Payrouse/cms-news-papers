import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journalist } from '../entities/journalist.entity';

@Injectable()
export class JournalistsService {
  constructor(
    @InjectRepository(Journalist)
    private journalistRepo: Repository<Journalist>,
  ) {}

  findAll() {
    return this.journalistRepo.find();
  }
}
