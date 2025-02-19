import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TypeTaskModule } from 'src/type-task/type-task.module';
import { TopicModule } from 'src/topic/topic.module';
import { TypeMiniGameModule } from 'src/type-mini-game/type-mini-game.module';
import { AnswerModule } from 'src/answer/answer.module';
import { ResponceTemplateModule } from 'src/responce-template/responce-template.module';
import { PracticMaterialModule } from 'src/practic-material/practic-material.module';

@Module({
  providers: [QuestionResolver, QuestionService, PrismaService],
  imports: [
    TypeTaskModule,
    TopicModule,
    TypeMiniGameModule,
    AnswerModule,
    ResponceTemplateModule,
    PracticMaterialModule,
  ],
})
export class QuestionModule {}
