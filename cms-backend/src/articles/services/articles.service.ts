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

  async findFeed() {
    const articles = await this.articleRepo.find({
      where: [
        { status: ArticleStatus.POSTED },
        { status: ArticleStatus.HIGHLIGHTED },
      ],
      relations: ['categoryId'],
      order: { publishedAt: 'DESC' },
    });
    return articles;
  }

  async findOne(articleId: string) {
    const article = await this.articleRepo.findOne(articleId, {
      relations: ['categoryId'],
      loadRelationIds: { relations: ['journalistId'] },
    });
    if (!article) {
      throw new NotFoundException(`Articulo #${articleId} no encontrado`);
    }
    return article;
  }

  async findArticlesRelated(categoryId: string) {
    const articlesRelated = await this.articleRepo.find({
      where: { categoryId, status: ArticleStatus.POSTED },
      order: { publishedAt: 'DESC' },
      take: 10,
    });
    if (!articlesRelated) {
      throw new NotFoundException(`Artículos no encontrados`);
    }
    return articlesRelated;
  }

  async findArticleHighlighted() {
    const dateNow = new Date();
    const date24hAgo = dateNow.getTime() - 86400000; // Número de días a restar
    const startDate = new Date(dateNow);
    const endDate = new Date(date24hAgo);
    const articleHighlighted = await this.articleRepo.find({
      where: {
        status: ArticleStatus.HIGHLIGHTED,
        publishedAt: Between(endDate, startDate),
      },
      order: { publishedAt: 'DESC' },
    });
    if (!articleHighlighted) {
      throw new NotFoundException(`Artículos no encontrados`);
    }
    return articleHighlighted;
  }

  async changeStatus(articleId: string, change: StatusArticleDto) {
    const article = await this.articleRepo.findOne(articleId);
    let publishedAt = null;
    if (
      change.status === ArticleStatus.POSTED ||
      change.status === ArticleStatus.HIGHLIGHTED
    ) {
      publishedAt = new Date();
    }
    this.articleRepo.merge(article, { ...change, publishedAt });

    try {
      return this.articleRepo.save(article);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el articulo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: CreateArticleDto, userId: string) {
    const newArticle = this.articleRepo.create(data);
    newArticle.journalistId = userId;
    try {
      return await this.articleRepo.save(newArticle);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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

  async findAllByJournalist(journalistId: string) {
    const articles = await this.articleRepo.find({
      where: { journalistId },
      relations: ['categoryId'],
      order: { status: 'ASC' },
    });
    return articles;
  }

  async findArticlesToReview() {
    const articles = await this.articleRepo.find({
      where: {
        status: ArticleStatus.WAIT,
      },
      relations: ['categoryId', 'journalistId', 'journalistId.user'],
      order: { updatedAt: 'ASC' },
    });
    return articles;
  }

  async findLastNews() {
    const articles = await this.articleRepo.find({
      where: [
        { status: ArticleStatus.POSTED },
        { status: ArticleStatus.HIGHLIGHTED },
      ],
      order: { publishedAt: 'DESC' },
      take: 10,
    });
    return articles;
  }
}
