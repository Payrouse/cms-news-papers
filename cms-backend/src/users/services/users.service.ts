import { CreateUserDto } from './../dtos/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findAll() {
    return await 'users';
  }

  async create(data: CreateUserDto) {
    return await data;
  }
}
