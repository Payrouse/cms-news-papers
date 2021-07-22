import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';

import { CreateArticleDto, UpdateArticleDto } from '../dtos/articles.dto';
import { ArticlesService } from './../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Post()
  create(@Body() payload: CreateArticleDto) {
    return this.articleService.create(payload);
  }

  @Get()
  getArticles(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.articleService.findAll();
  }

  @Post('related')
  getArticlesRelated(@Body() payload: any) {
    console.log('aca el error de payload:', payload);
    return this.articleService.findArticlesRelated(payload.categoryId);
  }

  @Put(':articleId')
  update(@Param('articleId') id: string, @Body() payload: UpdateArticleDto) {
    return this.articleService.update(id, payload);
  }

  @Delete(':articleId')
  drop(@Param('articleId') id: string) {
    return this.articleService.delete(id);
  }

  @Get(':articleId')
  getCategorie(@Param('articleId') id: string) {
    return this.articleService.findOne(id);
  }
}
