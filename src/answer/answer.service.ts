import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Answer, Question } from '@prisma/client';
import { UpdateAnswerInput } from './dto/input/update-answer.input';
import { UpdateAnswerModel } from './model/update.model';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async findAllByQuestion(questionId: number): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: { questionId: questionId },
    });
  }

  async update(
    updateAnswerData: UpdateAnswerInput,
  ): Promise<UpdateAnswerModel> {
    const idArray = updateAnswerData.answerData.map((data) => data.id);
    return this.prisma.answer.updateMany({
      where: {
        id: { in: idArray },
      },
      data: {
        ...updateAnswerData.answerData,
      },
    });
  }
}
