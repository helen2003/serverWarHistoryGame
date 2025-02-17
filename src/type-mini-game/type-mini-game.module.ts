import { Module } from '@nestjs/common';
import { TypeMiniGameService } from './type-mini-game.service';
import { TypeMiniGameResolver } from './type-mini-game.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [TypeMiniGameResolver, TypeMiniGameService, PrismaService],
  exports: [TypeMiniGameService]
})
export class TypeMiniGameModule {}
