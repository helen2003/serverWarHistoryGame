import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Answer, Question } from '@prisma/client';
import { UpdateAnswerInput } from './dto/input/update-answer.input';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async findAllByTask(questionId: number): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: { questionId: questionId },
    });
  }

  async updateOne(
    id: number,
    updateAnswerData: UpdateAnswerInput,
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
}
