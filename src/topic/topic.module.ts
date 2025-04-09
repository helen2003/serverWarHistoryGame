import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { SubtopicModule } from '../subtopic/subtopic.module';

@Module({
  providers: [TopicResolver, TopicService, PrismaService],
  exports: [TopicService],
  imports: [SubtopicModule]
})
export class TopicModule {}
