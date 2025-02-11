import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [TopicResolver, TopicService, PrismaService],
})
export class TopicModule {}
