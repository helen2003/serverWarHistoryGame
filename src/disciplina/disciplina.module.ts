import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaResolver } from './disciplina.resolver';

@Module({
  providers: [DisciplinaResolver, DisciplinaService],
})
export class DisciplinaModule {}
