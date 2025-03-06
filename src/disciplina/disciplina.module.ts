import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaResolver } from './disciplina.resolver';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [DisciplinaResolver, DisciplinaService, PrismaService],
})
export class DisciplinaModule {}
