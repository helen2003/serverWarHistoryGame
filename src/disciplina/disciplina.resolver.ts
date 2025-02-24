import { Resolver } from '@nestjs/graphql';
import { DisciplinaService } from './disciplina.service';

@Resolver()
export class DisciplinaResolver {
  constructor(private readonly disciplinaService: DisciplinaService) {}
}
