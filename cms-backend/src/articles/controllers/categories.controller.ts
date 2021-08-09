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
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
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
  create(@Body() payload: CreateCategoryDto) {
    //return { message: 'Mensaje de crear', payload };
    return this.categoriesService.create(payload);
  }

  @Public()
  @Get()
  getCategories(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    //deconstruccion
    //const { limit, offset } = params;
    //return `categories: limit => ${limit} offset => ${offset}`;
    return this.categoriesService.findAll();
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Put(':categoryId')
  update(@Param('categoryId') id: string, @Body() payload: UpdateCategoryDto) {
    /*return {
      id,
      payload,
    };*/
    return this.categoriesService.update(id, payload);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Delete(':categoryId')
  drop(@Param('categoryId') id: string) {
    return this.categoriesService.delete(id);
  }

  @Public()
  @Get(':categoryId')
  getCategory(@Param('categoryId') id: string) {
    //return `categorie ${id}`;
    return this.categoriesService.findOne(id);
  }
}
