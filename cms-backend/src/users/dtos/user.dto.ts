import {
  IsString,
  IsUrl,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsUrl()
  @IsOptional()
  readonly avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
