import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { TheoryMaterial } from '@prisma/client';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { GetTheoryMaterialMArgs } from './dto/args/theory-material.args';
import { getTypeFile, writeFile } from '../common/function/function-file';

@Injectable()
export class TheoryMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(
    file: Express.Multer.File & { description: string },
  ): Promise<ResponseFileUploadDto> {
    const fileName = writeFile(file);
    const typeFile = getTypeFile(file.mimetype);
    return this.prisma.theoryMaterial.create({
      data: {
        url: fileName,
        typeFileId: typeFile,
        description: file.description,
      },
      select: {
        id: true,
        url: true,
      },
    });
  }

  async createMany(
    files: Array<Express.Multer.File & { description: string }>,
  ): Promise<ResponseFileUploadDto[]> {
    let namesFiles = [];
    for (var file of files) {
      namesFiles.push({
        url: writeFile(file),
        typeFileId: getTypeFile(file.mimetype),
        description: file.description,
      });
    }
    return this.prisma.theoryMaterial.createManyAndReturn({
      data: namesFiles,
      select: {
        id: true,
        url: true,
      },
    });
  }

  async updateIdFile(
    fileId: Array<number>,
    idSubtopic: number,
  ): Promise<number> {
    const updateCount = await this.prisma.theoryMaterial.updateMany({
      where: {
        id: {
          in: fileId,
        },
      },
      data: {
        subtopicId: idSubtopic,
      },
    });
    return updateCount.count;
  }

  async gelAll(
    materialArgs: GetTheoryMaterialMArgs,
  ): Promise<TheoryMaterial[]> {
    return this.prisma.theoryMaterial.findMany({
      where: {
        AND: [
          {
            typeFileId: materialArgs.typeFileId,
          },
          {
            subtopicId: materialArgs.subtopicId,
          },
        ],
      },
    });
  }

  async delete(id: number) {
    return this.prisma.theoryMaterial.delete({
      where: {
        id: id,
      },
    });
  }
}
