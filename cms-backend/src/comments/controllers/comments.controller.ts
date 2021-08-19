import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { CommentsService } from './../services/comments.service';
import { Body, Controller, Get, Param, UseGuards, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentDto } from '../dtos/comment.dto';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Public()
  @Get()
  getComments() {
    return this.commentsService.findAll();
  }

  @Public()
  @Get('/article/:articleId')
  getCommentByArticle(@Param('articleId') articleId: string) {
    return this.commentsService.findAllByArticle(articleId);
  }

  @Public()
  @Get('/:commentId/replies')
  getCommentReplies(@Param('commentId') commentId: string) {
    return this.commentsService.findRepliesByComment(commentId);
  }

  @Public()
  @Post()
  create(@Body() payload: CreateCommentDto) {
    return this.commentsService.create(payload);
  }
}
