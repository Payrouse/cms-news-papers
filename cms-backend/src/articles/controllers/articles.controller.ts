import { Controller, Get } from '@nestjs/common';

import { ArticlesService } from './../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  getArticles() {
    return this.articleService.findAll();
  }
}
