import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import {
  ChangeStreamStatusDto,
  CreateStreamingDto,
  UpdateStreamDto,
} from '../dtos/streaming.dto';

import { StreamingsService } from './../services/streamings.service';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('streamings')
export class StreamingsController {
  constructor(private streamService: StreamingsService) {}

  @Roles(RoleEnum.ADMIN)
  @Get()
  getStreamings() {
    return this.streamService.findAll();
  }

  @Public()
  @Get('/public')
  getPublishedStreamings() {
    return this.streamService.findPublished();
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  createStreaming(@Req() req: Request, @Body() data: CreateStreamingDto) {
    const user = req.user as PayloadToken;
    return this.streamService.createStream(user.sub, data);
  }

  @Roles(RoleEnum.ADMIN)
  @Put(':streamId/status')
  changeStreamStatus(
    @Param('streamId') id: string,
    @Body() payload: ChangeStreamStatusDto,
  ) {
    return this.streamService.changeStreamStatus(id, payload);
  }

  @Roles(RoleEnum.ADMIN)
  @Put(':streamId')
  updateStream(
    @Param('streamId') id: string,
    @Body() payload: UpdateStreamDto,
  ) {
    return this.streamService.update(id, payload);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':streamId')
  deleteStream(@Param('streamId') id: string) {
    return this.streamService.delete(id);
  }
}
