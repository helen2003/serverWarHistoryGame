import { Module } from '@nestjs/common';
import { TypeRewardService } from './type-reward.service';
import { TypeRewardResolver } from './type-reward.resolver';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [TypeRewardResolver, TypeRewardService, PrismaService],
  exports: [TypeRewardService],
})
export class TypeRewardModule {}
