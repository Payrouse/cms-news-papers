import { JournalistsService } from './../services/journalists.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/models/roles.model';
import { CreateJournalistDto, UpdateJournalistDto } from '../dtos/journalist.dto';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('journalists')
export class JournalistsController {
  constructor(private journalistService: JournalistsService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Get()
  getJournalists() {
    return this.journalistService.findAll();
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  createNewJournalist(@Body() payload: CreateJournalistDto){
    return this.journalistService.createJournalist(payload)
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.JOURNALIST)
  @Put()
  updateJournalist(@Body() payload: UpdateJournalistDto){
    return this.journalistService.update(payload)
  }


}
