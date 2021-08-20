import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  Put,
} from '@nestjs/common';

// import { Public } from '../../auth/decorators/public.decorator';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersService } from './../services/users.service';
import { RoleEnum } from './../../auth/models/roles.model';
import { Roles } from './../../auth/decorators/roles.decorator';
import { PayloadToken } from 'src/auth/models/token.model';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(RoleEnum.ADMIN)
  @Get()
  async getUsers() { 
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get('/me')
  getMe(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.usersService.getUserByToken(user.sub);
  }

  @Public()
  @Get(':userId')
  getUser(@Param('userId') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':userId')
  updateUser(@Param('userId') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }
}
