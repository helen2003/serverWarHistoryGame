import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';
import { TokenInterface } from './interface/token.interface';
import { RegistationDto } from './dto/registation-dto.dto';
import { LocalAuthGuard } from '../common/guards/localAuthGuard.guard';
import { JwtPayloadInterface } from './interface/JwtPayload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: AuthUserDto })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/login')
  login(@Req() req: Request): Promise<TokenInterface> {
    return this.authService.login(req.user as JwtPayloadInterface);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/registration')
  registration(@Body() userDto: RegistationDto): Promise<TokenInterface> {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiBody({
    type: class token {
      token: string;
    },
  })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/refresh-tokens')
  tokenRefresh(@Body() token: string): Promise<TokenInterface> {
    return this.authService.refreshTokens(token);
  }
}
