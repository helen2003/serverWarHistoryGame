import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementResolver } from './achievement.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RewardModule } from 'src/reward/reward.module';

@Module({
  providers: [AchievementResolver, AchievementService, PrismaService],
  exports: [AchievementService],
  imports: [RewardModule],
})
export class AchievementModule {}
