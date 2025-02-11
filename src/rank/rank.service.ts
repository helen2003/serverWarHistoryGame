import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Rank } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RankService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<Rank> {
    const rank = await this.prisma.rank.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
    if (rank) {
      throw new HttpException('Звание уже записано', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.rank.create({ data: { name: name } });
  }

  async findOne(rankId: number): Promise<Rank> {
    return this.prisma.rank.findUnique({
      where: { id: rankId },
    });
  }

  async findAll(): Promise<Rank[]> {
    return this.prisma.rank.findMany({});
  }

  async update(id: number, name: string): Promise<Rank> {
    return this.prisma.rank.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async delete(id: number): Promise<Rank> {
    return this.prisma.rank.delete({
      where: {
        id: id,
      },
    });
  }
}
