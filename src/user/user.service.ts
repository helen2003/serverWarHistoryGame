import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEnum, User } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/input/update-user.input';
import { ValidateUser } from '../common/decorators/dto/validate-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const candidate = await this.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

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

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async updatePassword(user: ValidateUser, password: string): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 5);
    return this.prisma.user.update({
      where: {
        id: user.sub,
      },
      data: {
        password: hashPassword,
      },
    });
  }

  async updateRole(userId: number, role: RoleEnum): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
  }

  async update(
    user: ValidateUser,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: user.sub },
      data: { ...updateUserInput },
    });
  }

  async delete(user: ValidateUser) {
    return this.prisma.user.delete({
      where: {
        id: user.sub,
      },
    });
  }
}
