import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Answer, Question } from '@prisma/client';
import { UpdateAnswerInput } from './dto/input/update-answer.input';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async findAllByQuestion(questionId: number): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: { questionId: questionId },
    });
  }

  
}
