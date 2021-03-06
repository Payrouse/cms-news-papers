import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Article } from './article.entity';
import { Publisher } from '../../users/entities/publisher.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  categoryId: string;

  @Column({ name: 'name', type: 'varchar', length: 64, unique: true })
  name: string;

  @Column({ name: 'url', type: 'varchar', length: 64, unique: true })
  url: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // category -> publisher
  @ManyToOne(() => Publisher, (publisher) => publisher.categories, {
    nullable: false,
  })
  @Column({ name: 'publisher_id', type: 'uuid' })
  @JoinColumn({ name: 'publisher_id' })
  publisherId: Publisher;

  // category -> article
  @OneToMany(() => Article, (article) => article.categoryId)
  articles: Article[];
}
