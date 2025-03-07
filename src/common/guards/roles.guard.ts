import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      // const req = context.switchToHttp().getRequest();
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const user = this.jwtService.verify(token, {secret: this.configService.get<string>('JWT_ACCESS_SECRET')});
      req.user = user;
      requiredRoles.indexOf(user.role);
      if (requiredRoles.indexOf(user.role) > -1) {
        return true;
      }
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    } catch (e) {
      console.log(e);
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
