import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeReward } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TypeRewardService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<TypeReward> {
    const typeReward = await this.prisma.typeReward.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
    if (typeReward) {
      throw new HttpException(
        'Тип награды уже записан',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.typeReward.create({ data: { name: name } });
  }

  async findOne(typeRewardId: number): Promise<TypeReward> {
    return this.prisma.typeReward.findUnique({
      where: { id: typeRewardId },
    });
  }

  async findAll(): Promise<TypeReward[]> {
    return this.prisma.typeReward.findMany({});
  }

  async update(id: number, name: string): Promise<TypeReward> {
    return this.prisma.typeReward.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async delete(id: number): Promise<TypeReward> {
    return this.prisma.typeReward.delete({
      where: {
        id: id,
      },
    });
  }
}
