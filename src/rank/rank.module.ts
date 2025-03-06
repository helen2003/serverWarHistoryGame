import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankResolver } from './rank.resolver';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [RankResolver, RankService, PrismaService],
  exports: [RankService]
})
export class RankModule {}
