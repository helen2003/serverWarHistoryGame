import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';
import { TokenInterface } from './interface/token.interface';
import { RegistationDto } from './dto/registation-dto.dto';
import { LocalAuthGuard } from 'src/common/guards/localAuthGuard.guard';
import { JwtPayloadInterface } from './interface/JwtPayload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/login')
  login(@Req() req: Request): Promise<TokenInterface> {
    console.log(req);
    return this.authService.login(req.user as JwtPayloadInterface);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: TokenInterface })
  @Post('/registration')
  registration(@Body() userDto: RegistationDto): Promise<TokenInterface> {
    return this.authService.registration(userDto);
  }
}
