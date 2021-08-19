import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { CommentsService } from './../services/comments.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  @Get()
  getCommentByArticle(@Param(':articleId') id: string) {
    return this.commentsService.findAllByArticle(id);
  }
}
