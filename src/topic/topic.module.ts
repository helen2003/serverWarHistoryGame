import { forwardRef, Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { SubtopicModule } from '../subtopic/subtopic.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  providers: [TopicResolver, TopicService, PrismaService],
  exports: [TopicService],
  imports: [SubtopicModule, forwardRef(() => QuestionModule)],
})
export class TopicModule {}
