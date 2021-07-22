import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly subtitle: string;

  @IsString()
  @IsNotEmpty()
  readonly keywords: string;

  @IsNotEmpty()
  @IsUrl()
  readonly picture: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsOptional()
  @IsNumber()
  readonly status: number;

  @IsNotEmpty()
  @IsString()
  readonly categoryId: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
