import { Module } from '@nestjs/common';
import { TestingService } from './testing.service';
import { TestingResolver } from './testing.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { TopicModule } from '../topic/topic.module';

@Module({
  providers: [TestingResolver, TestingService, PrismaService],
  imports: [TopicModule],
  exports: [TestingService],
})
export class TestingModule {}
