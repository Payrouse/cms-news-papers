import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Article } from './entities/article.entity';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { LastNewsGateway } from './gateways/last-news.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category])],
  controllers: [ArticlesController, CategoriesController],
  providers: [ArticlesService, CategoriesService, LastNewsGateway],
})
export class ArticlesModule {}
