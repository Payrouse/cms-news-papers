import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll() {
    return this.userRepo.find();
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    // hash the password
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    return await this.userRepo.save(newUser);
  }
}
