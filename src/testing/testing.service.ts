import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Testing } from '@prisma/client';

@Injectable()
export class TestingService {
  constructor(private prisma: PrismaService) {}

  async create(topicId: number, userId: number): Promise<Testing> {
    return this.prisma.testing.create({
      data: { topicId: topicId, userId: userId },
    });
  }

  async findAll() {
    return `This action returns all testing`;
  }

  update(id: number) {
    return `This action updates a #${id} testing`;
  }

  delete(id: number) {
    return `This action removes a #${id} testing`;
  }
}
