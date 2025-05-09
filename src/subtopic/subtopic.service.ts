import { Injectable } from '@nestjs/common';
import { Subtopic } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateSubtopicInput } from './dto/input/update-model.input';

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

    async update(updateSubtopicData: UpdateSubtopicInput): Promise<Subtopic> {
      return this.prisma.subtopic.update({
        where: {
          id: updateSubtopicData.id,
        },
        data: {
          ...updateSubtopicData,
        },
      });
    }
  
    async delete(id: number): Promise<Subtopic> {
      return this.prisma.subtopic.delete({
        where: {
          id: id,
        },
      });
    }
}
