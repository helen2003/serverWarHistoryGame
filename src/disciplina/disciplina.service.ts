import { Injectable } from '@nestjs/common';
import { Disciplina } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class DisciplinaService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, shortName: string): Promise<Disciplina> {
    return this.prisma.disciplina.create({
      data: { name: name, shortName: shortName },
    });
  }
}
