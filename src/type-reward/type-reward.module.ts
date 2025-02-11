import { Module } from '@nestjs/common';
import { TypeRewardService } from './type-reward.service';
import { TypeRewardResolver } from './type-reward.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [TypeRewardResolver, TypeRewardService, PrismaService],
  exports: [TypeRewardModule],
})
export class TypeRewardModule {}
