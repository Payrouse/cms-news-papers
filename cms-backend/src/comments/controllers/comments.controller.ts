import { CommentsService } from './../services/comments.service';
import { Controller, Get } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  getComments() {
    return this.commentsService.findAll();
  }
}
