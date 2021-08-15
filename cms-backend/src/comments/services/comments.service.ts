import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  findAll() {
    return this.commentRepo.find();
  }

  async findAllByArticle(articleId: string) {
    const comment = await this.commentRepo.find({
      where: { articleId },
    });
    if (!comment) {
      throw new NotFoundException(`Comentario #${articleId} no encontrado`);
    }
    return comment;
  }
}
