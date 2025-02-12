import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RankModule } from 'src/rank/rank.module';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
  imports: [RankModule],
})
export class UserModule {}
