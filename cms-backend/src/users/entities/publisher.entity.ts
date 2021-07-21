import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from './user.entity';
import { Article } from '../../articles/entities/article.entity';
import { Category } from '../../articles/entities/category.entity';

@Entity({ name: 'publishers' })
export class Publisher {
  @Column({ name: 'section', type: 'varchar', length: 64 })
  section: string;

  @OneToOne(() => User, (user) => user.publisher, { primary: true })
  @JoinColumn({ name: 'publisher_id' })
  user: User;

  // publisher -> article
  @OneToMany(() => Category, (category) => category.publisher)
  categories: Category[];

  // publisher -> article
  @OneToMany(() => Article, (article) => article.publisher)
  articles: Article[];
}
