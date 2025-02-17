import { Injectable } from '@nestjs/common';
import { TypeMiniGame } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TypeMiniGameService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<TypeMiniGame> {
    return this.prisma.typeMiniGame.create({ data: { name: name } });
  }

  async findOne(typeRewardId: number): Promise<TypeMiniGame> {
    return this.prisma.typeMiniGame.findUnique({
      where: { id: typeRewardId },
    });
  }

  async findAll(): Promise<TypeMiniGame[]> {
    return this.prisma.typeMiniGame.findMany({});
  }

  async update(id: number, name: string): Promise<TypeMiniGame> {
    return this.prisma.typeMiniGame.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async delete(id: number): Promise<TypeMiniGame> {
    return this.prisma.typeMiniGame.delete({
      where: {
        id: id,
      },
    });
  }
}
