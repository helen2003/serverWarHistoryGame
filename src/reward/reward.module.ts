import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardResolver } from './reward.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TypeRewardModule } from 'src/type-reward/type-reward.module';
import { RewardController } from './reward.controller';

@Module({
  providers: [RewardResolver, RewardService, PrismaService],
  imports: [TypeRewardModule],
  exports: [RewardService],
  controllers: [RewardController]
})
export class RewardModule {}
