import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [AnswerResolver, AnswerService, PrismaService],
})
export class AnswerModule {}
