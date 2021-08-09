import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  ChangeStreamStatusDto,
  CreateStreamingDto,
  UpdateStreamDto,
} from '../dtos/streaming.dto';
import { StreamStatus } from '../models/StreamEnum';

import { Streaming } from './../entities/streaming.entity';
import { AdministratorsService } from './administrators.service';

@Injectable()
export class StreamingsService {
  constructor(
    @InjectRepository(Streaming) private streamRepo: Repository<Streaming>,
    private connection: Connection,
    private administratorService: AdministratorsService,
  ) {}

  findAll() {
    return this.streamRepo.find();
  }

  findPublished() {
    return this.streamRepo.find({ status: 1 });
  }

  async createStream(adminId: string, data: CreateStreamingDto) {
    const admin = await this.administratorService.getAdministrator(adminId);
    const newStream = this.streamRepo.create({
      description: data.description,
      videoUrl: data.videoUrl,
      status: StreamStatus.CREATED,
      administrator: admin,
    });

    const transaction = this.connection.createQueryRunner();
    await transaction.connect();

    await transaction.startTransaction();

    try {
      await transaction.manager.save(newStream);
      await transaction.commitTransaction();
    } catch (err) {
      await transaction.rollbackTransaction();
      console.error(err.message);
      return { err };
    } finally {
      await transaction.release();
    }

    return 'Stream Created Successfully';
  }

  async changeStreamStatus(streamId: string, status: ChangeStreamStatusDto) {
    const stream = await this.streamRepo.findOne(streamId);
    if (!stream)
      throw new HttpException('Stream Not Found', HttpStatus.NOT_FOUND);
    this.streamRepo.merge(stream, status);
    try {
      this.streamRepo.save(stream);
      return `The stream is ${StreamStatus[status.status]}`;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el streaming',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(streamId: string, data: UpdateStreamDto) {
    const stream = await this.streamRepo.findOne(streamId);
    if (!stream)
      throw new HttpException('Stream Not Found', HttpStatus.NOT_FOUND);
    this.streamRepo.merge(stream, data);
    try {
      this.streamRepo.save(stream);
      return `Stream Updated`;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el streaming',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(streamId: string) {
    const stream = await this.streamRepo.findOne(streamId);
    if (!stream)
      throw new HttpException('Stream Not Found', HttpStatus.NOT_FOUND);
    try {
      await this.streamRepo.delete(streamId);
      return `Stream Deleted`;
    } catch (error) {
      throw new HttpException(
        'Error al eliminarel streaming',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
