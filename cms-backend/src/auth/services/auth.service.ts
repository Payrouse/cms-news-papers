import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './../../users/entities/user.entity';
import { UsersService } from './../../users/services/users.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // If user is found, compare passwords
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    }
    return null;
  }

  async generateJwtToken(user: User) {
    const roles = await user.userToRoles;
    const listRoles = roles.map((role) => role.roleId);

    const payload: PayloadToken = { role: listRoles, sub: user.userId };
    console.log('payload', payload);

    const { email, firstName, lastName, avatar } = user;
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email,
        firstName,
        lastName,
        avatar,
      },
    };
  }
}
