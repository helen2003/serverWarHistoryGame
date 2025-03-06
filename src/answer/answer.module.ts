import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { FileAnswerModule } from '../file-answer/file-answer.module';

@Module({
  providers: [AnswerResolver, AnswerService, PrismaService],
  exports: [AnswerService],
  imports: [FileAnswerModule]
})
export class AnswerModule {}
