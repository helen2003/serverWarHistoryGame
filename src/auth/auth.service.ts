import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenInterface } from './interface/token.interface';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadInterface } from './interface/JwtPayload.interface';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { RegistationDto } from './dto/registation-dto.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: JwtPayloadInterface): Promise<TokenInterface> {
    return this.getTokens({
      sub: user.sub,
      login: user.login,
      role: user.role,
    });
  }

  async registration(userDto: RegistationDto): Promise<TokenInterface> {
    const user = await this.userService.create(userDto);
    return this.getTokens({
      sub: user.id,
      login: user.login,
      role: user.role,
    });
  }

  async getTokens(user: JwtPayloadInterface): Promise<TokenInterface> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenInterface> {
    const user = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    return this.getTokens({
      sub: user.sub,
      login: user.login,
      role: user.role,
    });
  }

  async validateUser(userDto: AuthUserDto): Promise<User> {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
    return user;
  }
}
