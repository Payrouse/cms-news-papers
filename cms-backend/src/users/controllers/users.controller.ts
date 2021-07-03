import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from './../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
