import { Injectable } from '@nestjs/common';
import { TypeTask } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TypeTaskService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<TypeTask> {
    return this.prisma.typeTask.create({ data: { name: name } });
  }

  async findOne(typeRewardId: number): Promise<TypeTask> {
    return this.prisma.typeTask.findUnique({
      where: { id: typeRewardId },
    });
  }

  async findAll(): Promise<TypeTask[]> {
    return this.prisma.typeTask.findMany({});
  }

  async update(id: number, name: string): Promise<TypeTask> {
    return this.prisma.typeTask.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async delete(id: number): Promise<TypeTask> {
    return this.prisma.typeTask.delete({
      where: {
        id: id,
      },
    });
  }
}
