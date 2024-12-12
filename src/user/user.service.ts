import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const candidate = await this.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.create({
      data: {
        ...userDto,
        password: hashPassword,
      },
    });
  }

  async getUserByLogin(login: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { login: login } });
  }
}
