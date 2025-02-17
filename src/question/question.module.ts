import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TypeTaskModule } from 'src/type-task/type-task.module';
import { TopicModule } from 'src/topic/topic.module';
import { TypeMiniGameModule } from 'src/type-mini-game/type-mini-game.module';

@Module({
  providers: [QuestionResolver, QuestionService, PrismaService],
  imports: [TypeTaskModule, TopicModule, TypeMiniGameModule]
})
export class QuestionModule {}
