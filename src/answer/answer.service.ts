import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUpdateAnswerInput } from './dto/create-update-answer.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Answer } from '@prisma/client';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async createOne(createAnswerData: CreateUpdateAnswerInput): Promise<Answer> {
    return this.prisma.answer.create({
      data: { ...createAnswerData },
    });
  }

  async findAllByTask(questionId: number): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: { questionId: questionId },
    });
  }

  async updateOne(
    id: number,
    updateAnswerData: CreateUpdateAnswerInput,
  ): Promise<Answer> {
    return this.prisma.answer.update({
      where: {
        id: id,
      },
      data: {
        ...updateAnswerData,
      },
    });
  }

  async deleteOne(id: number, questionId: number): Promise<Answer> {
    const count: number = await this.prisma.answer.count({
      where: {
        questionId: questionId,
      },
    });
    if (count < 2)
      throw new HttpException(
        'Ошибка удаления. Записано менее 2 ответов.',
        HttpStatus.BAD_REQUEST,
      );
    else
      return this.prisma.answer.delete({
        where: {
          id: id,
        },
      });
  }
}
