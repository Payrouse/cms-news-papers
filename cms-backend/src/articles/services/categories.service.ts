import { Category } from './../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepo.find();
    return categories;
  }

  async findOne(categoryId: string) {
    const category = await this.categoryRepo.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Categoría #${categoryId} no encontrado`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    try {
      return await this.categoryRepo.save(newCategory);
    } catch (error) {
      throw new HttpException(
        'Error al crear la categoría',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(categoryId: string, change: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(categoryId);
    this.categoryRepo.merge(category, change);
    try {
      return this.categoryRepo.save(category);
    } catch (error) {
      throw new HttpException(
        'Error al crear la categoría',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(categoryId: string) {
    const category = await this.categoryRepo.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Categoría no encontrado`);
    }
    return await this.categoryRepo.delete(categoryId);
  }
}
