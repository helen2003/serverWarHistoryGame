import { forwardRef, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { TypeTaskModule } from '../type-task/type-task.module';
import { TopicModule } from '../topic/topic.module';
import { TypeMiniGameModule } from '../type-mini-game/type-mini-game.module';
import { AnswerModule } from '../answer/answer.module';
import { ResponceTemplateModule } from '../responce-template/responce-template.module';
import { PracticMaterialModule } from '../practic-material/practic-material.module';

@Module({
  providers: [QuestionResolver, QuestionService, PrismaService],
  imports: [
    TypeTaskModule,
    forwardRef(() => TopicModule),
    TypeMiniGameModule,
    AnswerModule,
    ResponceTemplateModule,
    PracticMaterialModule,
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
