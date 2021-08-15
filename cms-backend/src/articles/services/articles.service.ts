import { StatusArticleDto } from './../dtos/articles.dto';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateArticleDto, UpdateArticleDto } from '../dtos/articles.dto';
import { Article } from './../entities/article.entity';
import { ArticleStatus } from '../models/articleStatus.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
  ) {}

  async findAll() {
    const articles = await this.articleRepo.find();
    return articles;
  }

  async findOne(articleId: string) {
    const articles = await this.articleRepo.findOne(articleId);
    if (!articles) {
      throw new NotFoundException(`Articulo #${articleId} no encontrado`);
    }
    return articles;
  }

  async findOneByTitle(title: string) {
    const articles = await this.articleRepo.findOne(title);
    if (!articles) {
      throw new NotFoundException(`Articulo #${title} no encontrado`);
    }
    return articles;
  }

  async findArticlesRelated(categoryId: string) {
    const articlesRelated = await this.articleRepo.find({
      where: { categoryId, status: ArticleStatus.POSTED },
      order: { publishedAt: 'DESC' },
      take: 10,
    });
    if (!articlesRelated) {
      throw new NotFoundException(`Articulos no encontrados`);
    }
    return articlesRelated;
  }

  async findArticleHighlighted() {
    const datenow = new Date();
    const date24hAgo = datenow.getTime() - 86400000; // Número de días a restar
    const startDate = new Date(datenow);
    const endDate = new Date(date24hAgo);
    const articleHighlighted = await this.articleRepo.find({
      where: {
        status: ArticleStatus.HIGHLIGHTED,
        publishedAt: Between(endDate, startDate),
      },
      order: { publishedAt: 'DESC' },
    });
    if (!articleHighlighted) {
      throw new NotFoundException(`Articulos no encontrados`);
    }
    return articleHighlighted;
  }

  async changeStatus(articleId: string, change: StatusArticleDto) {
    const article = await this.articleRepo.findOne(articleId);
    this.articleRepo.merge(article, change);
    try {
      return this.articleRepo.save(article);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el articulo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: CreateArticleDto) {
    const newArticle = this.articleRepo.create(data);
    try {
      return await this.articleRepo.save(newArticle);
    } catch (error) {
      throw new HttpException(
        'Error al crear el articulo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(articleId: string, change: UpdateArticleDto) {
    const article = await this.articleRepo.findOne(articleId);
    this.articleRepo.merge(article, change);
    try {
      return this.articleRepo.save(article);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el articulo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(articleId: string) {
    const articles = await this.articleRepo.findOne(articleId);
    if (!articles) {
      throw new NotFoundException(`Articulo no encontrado`);
    }
    return await this.articleRepo.delete(articleId);
  }
}
