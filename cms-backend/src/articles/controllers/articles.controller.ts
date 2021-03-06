import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { Roles } from './../../auth/decorators/roles.decorator';
import { RoleEnum } from './../../auth/models/roles.model';
import { ApiKeyGuard } from './../../auth/guards/api-key.guard';
import { StatusArticleDto } from './../dtos/articles.dto';

import { CreateArticleDto, UpdateArticleDto } from '../dtos/articles.dto';
import { ArticlesService } from './../services/articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { PayloadToken } from 'src/auth/models/token.model';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.JOURNALIST)
  @Post()
  create(@Req() req: Request, @Body() payload: CreateArticleDto) {
    const user = req.user as PayloadToken;
    return this.articleService.create(payload, user.sub);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.JOURNALIST)
  @Get('/journalist')
  getByJournalist(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.articleService.findAllByJournalist(user.sub);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Get('/reviews')
  getArticlesToReview() {
    return this.articleService.findArticlesToReview();
  }

  @Public()
  @Get('/last-news')
  getLastNews() {
    return this.articleService.findLastNews();
  }

  @Public()
  @Get('/highlighted')
  getHighlighted() {
    return this.articleService.findArticleHighlighted();
  }

  @Public()
  @Get('/feed')
  getFeedArticles() {
    return this.articleService.findFeed();
  }

  @Public()
  @Get()
  getArticles(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.articleService.findAll();
  }

  @Public()
  @Get('/related/:categoryId')
  getArticlesRelated(@Param('categoryId') categoryId: string) {
    return this.articleService.findArticlesRelated(categoryId);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Put(':articleId/status')
  updateStatus(
    @Param('articleId') id: string,
    @Body() payload: StatusArticleDto,
  ) {
    return this.articleService.changeStatus(id, payload);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.JOURNALIST)
  @Put(':articleId')
  update(@Param('articleId') id: string, @Body() payload: UpdateArticleDto) {
    return this.articleService.update(id, payload);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Delete(':articleId')
  drop(@Param('articleId') id: string) {
    return this.articleService.delete(id);
  }

  @Public()
  @Get(':articleId')
  getCategory(@Param('articleId') id: string) {
    return this.articleService.findOne(id);
  }

  @Public()
  @Get('/title/:title')
  getArticleTitle(@Param('title') title: string) {
    return this.articleService.findOneByTitle(title);
  }
}
