import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { User } from './../../users/entities/user.entity';
import { UsersService } from './../../users/services/users.service';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { AuthService } from './../services/auth.service';
import { ApiKeyGuard } from './../guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJwtToken(user);
  }

  @Post('register')
  register(@Body() payload: CreateUserDto) {
    return this.usersService.registerUser(payload);
  }
}
