import { Injectable } from '@nestjs/common';
import { Topic } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateTopicInput } from './dto/update-model.input';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, disciplinaId: number): Promise<Topic> {
    return this.prisma.topic.create({
      data: { name: name, disciplinaId: disciplinaId },
    });
  }

  async findOne(topicId: number): Promise<Topic> {
    return this.prisma.topic.findUnique({
      where: { id: topicId },
    });
  }

  async findAll(): Promise<Topic[]> {
    return this.prisma.topic.findMany({});
  }

  async update(updateTopicData: UpdateTopicInput): Promise<Topic> {
    return this.prisma.topic.update({
      where: {
        id: updateTopicData.id,
      },
      data: {
        ...updateTopicData,
      },
    });
  }

  async delete(id: number): Promise<Topic> {
    return this.prisma.topic.delete({
      where: {
        id: id,
      },
    });
  }
}
