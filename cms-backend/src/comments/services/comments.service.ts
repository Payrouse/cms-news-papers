import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/comment.dto';

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
      where: { articleId, commentRoot: null },
      relations: ['userId'],
      loadRelationIds: { relations: ['articleId'] },
    });
    if (!comment) {
      throw new NotFoundException(`Comentario #${articleId} no encontrado`);
    }
    return comment;
  }

  async findRepliesByComment(commentRoot: string) {
    const comments = await this.commentRepo.find({
      where: { commentRoot },
      relations: ['userId'],
      loadRelationIds: { relations: ['articleId'] },
    });
    if (!comments) {
      throw new NotFoundException(`Comentario #${commentRoot} no encontrado`);
    }
    return comments;
  }

  async create(data: CreateCommentDto) {
    const newComment = this.commentRepo.create(data);
    try {
      return await this.commentRepo.save(newComment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
