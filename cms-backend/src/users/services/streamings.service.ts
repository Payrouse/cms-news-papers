import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Streaming } from './../entities/streaming.entity';

@Injectable()
export class StreamingsService {
  constructor(
    @InjectRepository(Streaming) private streamRepo: Repository<Streaming>,
  ) {}

  findAll() {
    return this.streamRepo.find();
  }
}
