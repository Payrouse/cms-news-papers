import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: any[] = this.reflector.get(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;

    const isAuth = roles.some((role) => user.role.includes(role));

    if (!isAuth) {
      throw new ForbiddenException('Rol is wrong');
    }
    return isAuth;
  }
}
