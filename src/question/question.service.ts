import { Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetQuestionAllArgs } from './dto/args/find-all-question.args';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  // async create(
  //   createQuestionData: CreateUpdateQuestionInput,
  // ): Promise<Question> {
  //   return this.prisma.question.create({ data: { ...createQuestionData } });
  // }

  // async findOne(id: number): Promise<Question> {
  //   return this.prisma.question.findUnique({
  //     where: { id: id },
  //   });
  // }

  // async findAll(getAllArgs: GetQuestionAllArgs): Promise<Question[]> {
  //   return this.prisma.question.findMany({
  //     take: getAllArgs.take,
  //     where: {
  //       AND: [
  //         {
  //           scaleImportantId: getAllArgs.scaleImportantId,
  //         },
  //         {
  //           typeMiniGameId: getAllArgs.typeMiniGameId,
  //         },
  //         {
  //           typeTaskId: getAllArgs.typeTaskId,
  //         },
  //         {
  //           topicId: getAllArgs.topicId,
  //         },
  //       ],
  //     },
  //   });
  // }

  // async update(
  //   id: number,
  //   updateQuestionData: CreateUpdateQuestionInput,
  // ): Promise<Question> {
  //   return this.prisma.question.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       ...updateQuestionData,
  //     },
  //   });
  // }

  // async delete(id: number): Promise<Question> {
  //   return this.prisma.question.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
