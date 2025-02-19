import { Module } from '@nestjs/common';
import { TypeFileService } from './type-file.service';
import { TypeFileResolver } from './type-file.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [TypeFileResolver, TypeFileService, PrismaService],
  exports: [TypeFileService],
})
export class TypeFileModule {}
