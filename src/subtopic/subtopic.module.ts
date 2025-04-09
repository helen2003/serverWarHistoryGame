import { Module } from '@nestjs/common';
import { SubtopicService } from './subtopic.service';
import { SubtopicResolver } from './subtopic.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { TheoryMaterialModule } from '../theory-material/theory-material.module';

@Module({
  providers: [SubtopicResolver, SubtopicService, PrismaService],
  exports: [SubtopicService],
  imports: [TheoryMaterialModule],
})
export class SubtopicModule {}
