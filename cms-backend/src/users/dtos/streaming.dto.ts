import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { StreamStatus } from '../models/StreamEnum';

export class CreateStreamingDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsUrl()
  @IsNotEmpty()
  readonly videoUrl: string;
}

export class ChangeStreamStatusDto{
    @IsEnum(StreamStatus)
    @IsNotEmpty()
    readonly status: StreamStatus
}

export class UpdateStreamDto extends PartialType(CreateStreamingDto){}