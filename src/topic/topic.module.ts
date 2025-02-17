import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TheoryMaterialModule } from 'src/theory-material/theory-material.module';

@Module({
  providers: [TopicResolver, TopicService, PrismaService],
  exports: [TopicService],
  imports: [TheoryMaterialModule]
})
export class TopicModule {}
