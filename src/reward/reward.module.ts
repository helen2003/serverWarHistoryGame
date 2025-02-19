import { Global, Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardResolver } from './reward.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TypeRewardModule } from 'src/type-reward/type-reward.module';
import { RewardController } from './reward.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Global()
@Module({
  providers: [RewardResolver, RewardService, PrismaService],
  imports: [
    TypeRewardModule,
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.resolve(__dirname, '../..', 'static'),
    }),
  ],
  exports: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
