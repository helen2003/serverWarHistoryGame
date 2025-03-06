import { Module } from '@nestjs/common';
import { TypeTaskService } from './type-task.service';
import { TypeTaskResolver } from './type-task.resolver';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [TypeTaskResolver, TypeTaskService, PrismaService],
  exports: [TypeTaskService]
})
export class TypeTaskModule {}
