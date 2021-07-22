import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateCategorieDto, UpdateCategorieDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/models/roles.model';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Post()
  create(@Body() payload: CreateCategorieDto) {
    return this.categoriesService.create(payload);
  }

  @Public()
  @Get()
  getCategories(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.categoriesService.findAll();
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Put(':categoryId')
  update(@Param('categoryId') id: string, @Body() payload: UpdateCategorieDto) {
    return this.categoriesService.update(id, payload);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Delete(':categoryId')
  drop(@Param('categoryId') id: string) {
    return this.categoriesService.delete(id);
  }

  @Public()
  @Get(':categoryId')
  getCategorie(@Param('categoryId') id: string) {
    return this.categoriesService.findOne(id);
  }
}
