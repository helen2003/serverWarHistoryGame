import { Injectable } from '@nestjs/common';
import { TypeFile } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TypeFileService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<TypeFile> {
    return this.prisma.typeFile.create({ data: { name: name } });
  }

  async findOne(typeFileId: number): Promise<TypeFile> {
    return this.prisma.typeFile.findUnique({
      where: { id: typeFileId },
    });
  }

  async findAll(): Promise<TypeFile[]> {
    return this.prisma.typeFile.findMany({});
  }

  async update(id: number, name: string): Promise<TypeFile> {
    return this.prisma.typeFile.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async delete(id: number): Promise<TypeFile> {
    return this.prisma.typeFile.delete({
      where: {
        id: id,
      },
    });
  }
}
