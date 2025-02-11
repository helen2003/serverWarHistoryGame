import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RankService } from 'src/rank/rank.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService, RankService]
})
export class UserModule {}
