import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

// import { Public } from '../../auth/decorators/public.decorator';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';

import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from './../services/users.service';
import { RoleEnum } from './../../auth/models/roles.model';
import { Roles } from './../../auth/decorators/roles.decorator';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(RoleEnum.ADMIN)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
