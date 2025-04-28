import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { GetQuestionAllArgs } from './dto/args/find-all-question.args';
import { CreateQuestionInput } from './dto/input/create-question.input';
import { UpdateQuestionInput } from './dto/input/update-question.input';
import { QuestionAllOutput } from './dto/ouput/findAll-question.output';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionData: CreateQuestionInput): Promise<Question> {
    const { Answer, ResponceTemplate, ...questionData } = createQuestionData;
    return this.prisma.question.create({
      data: {
        ...questionData,
        Answer: { createMany: { data: [...Answer] } },
        ResponceTemplate: { createMany: { data: [...ResponceTemplate] } },
      },
    });
  }

  async findOne(id: number): Promise<Question> {
    return this.prisma.question.findUnique({
      where: { id: id },
    });
  }

  async findAllByTopic(id: number): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: {
        topicId: id,
      },
    });
  }

  async findAll(getAllArgs: GetQuestionAllArgs) {
    const totalCount = await this.prisma.question.count({});
    if (getAllArgs.random) {
      return {
        totalCount: totalCount,
        Questions: await this.prisma
          .$queryRaw`SELECT * FROM Question WHERE topicId = ${getAllArgs.topicId} ORDER BY random() LIMIT ${getAllArgs.take}`,
      };
    } else
      return {
        totalCount: totalCount,
        Questions: await this.prisma.question.findMany({
          take: getAllArgs.take,
          where: {
            AND: [
              {
                scaleImportantId: getAllArgs.scaleImportantId,
              },
              {
                typeMiniGameId: getAllArgs.typeMiniGameId,
              },
              {
                typeTaskId: getAllArgs.typeTaskId,
              },
              {
                topicId: getAllArgs.topicId,
              },
            ],
          },
        }),
      };
  }

  async update(
    id: number,
    updateQuestionData: UpdateQuestionInput,
  ): Promise<Question> {
    return this.prisma.question.update({
      where: {
        id: id,
      },
      data: {
        ...updateQuestionData,
      },
    });
  }

  async delete(id: number): Promise<Question> {
    return this.prisma.question.delete({
      where: {
        id: id,
      },
    });
  }
}
