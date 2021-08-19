import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly articleId: string;

  @IsString()
  @IsOptional()
  readonly commentRoot: string;
}
