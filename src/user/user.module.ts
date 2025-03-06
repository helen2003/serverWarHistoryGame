import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../common/prisma/prisma.service';
import { RankModule } from '../rank/rank.module';
import { AchievementModule } from '../achievement/achievement.module';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
  imports: [RankModule, AchievementModule],
})
export class UserModule {}
