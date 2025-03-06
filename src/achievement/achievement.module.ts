import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementResolver } from './achievement.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { RewardModule } from '../reward/reward.module';

@Module({
  providers: [AchievementResolver, AchievementService, PrismaService],
  exports: [AchievementService],
  imports: [RewardModule],
})
export class AchievementModule {}
