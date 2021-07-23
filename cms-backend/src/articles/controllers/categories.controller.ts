import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    //return { message: 'Mensaje de crear', payload };
    return this.categoriesService.create(payload);
  }

  @Get()
  getCategories(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    //deconstruccion
    //const { limit, offset } = params;
    //return `categories: limit => ${limit} offset => ${offset}`;
    return this.categoriesService.findAll();
  }

  @Put(':categoryId')
  update(@Param('categoryId') id: string, @Body() payload: UpdateCategoryDto) {
    /*return {
      id,
      payload,
    };*/
    return this.categoriesService.update(id, payload);
  }

  @Delete(':categoryId')
  drop(@Param('categoryId') id: string) {
    return this.categoriesService.delete(id);
  }

  @Get(':categoryId')
  getCategory(@Param('categoryId') id: string) {
    //return `categorie ${id}`;
    return this.categoriesService.findOne(id);
  }
}
