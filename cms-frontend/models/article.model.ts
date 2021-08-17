import { Category } from './category.model';

export interface Article {
  articleId: string;
  keywords: string;
  title: string;
  subtitle: string;
  picture: string;
  body: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  journalistId: string;
  publisherId: string;
  feedback: string;
  category?: Category;
}

export enum ArticleStatus {
  DRAFT = 0,
  WAIT = 1,
  REJECTED = 2,
  HIGHLIGHTED = 3,
  POSTED = 4,
}
