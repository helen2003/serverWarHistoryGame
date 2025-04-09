import { Injectable } from '@nestjs/common';
import { Subtopic } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SubtopicService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, topicId: number): Promise<Subtopic> {
    return this.prisma.subtopic.create({
      data: { name: name, topicId: topicId },
    });
  }

  async findOne(subtopicId: number): Promise<Subtopic> {
    return this.prisma.subtopic.findUnique({
      where: { id: subtopicId },
    });
  }

  async findAllByTopic(topicId: number): Promise<Subtopic[]> {
    return this.prisma.subtopic.findMany({
      where: { topicId: topicId },
    });
  }
}
