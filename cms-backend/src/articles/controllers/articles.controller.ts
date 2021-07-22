import { Roles } from './../../auth/decorators/roles.decorator';
import { RoleEnum } from './../../auth/models/roles.model';
import { ApiKeyGuard } from './../../auth/guards/api-key.guard';
import { StatusArticleDto } from './../dtos/articles.dto';
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
} from '@nestjs/common';

import { CreateArticleDto, UpdateArticleDto } from '../dtos/articles.dto';
import { ArticlesService } from './../services/articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.JOURNALIST)
  @Post()
  create(@Body() payload: CreateArticleDto) {
    return this.articleService.create(payload);
  }

  @Public()
  @Get('highlighted')
  getHighlighted() {
    return this.articleService.findArticleHighlighted();
  }

  @Public()
  @Get()
  getArticles(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.articleService.findAll();
  }

  @Public()
  @Post('related')
  getArticlesRelated(@Body() payload: any) {
    //console.log('aca el error de payload:', payload);
    return this.articleService.findArticlesRelated(payload.categoryId);
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
  getCategorie(@Param('articleId') id: string) {
    return this.articleService.findOne(id);
  }
}
