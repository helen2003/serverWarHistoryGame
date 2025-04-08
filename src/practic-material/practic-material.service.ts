import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import {
  getTypeFile,
  writeFile,
} from '../common/function/function-file';
import { PracticMaterial } from '@prisma/client';
import { GetPracticMaterialArgs } from './dto/args/practic-material.args';

@Injectable()
export class PracticMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File): Promise<ResponseFileUploadDto> {
    const fileName = writeFile(file);
    return this.prisma.practicMaterial.create({
      data: { url: fileName, typeFileId: getTypeFile(file.mimetype) },
      select: {
        id: true,
        url: true,
      },
    });
  }

  async createMany(
    files: Array<Express.Multer.File>,
  ): Promise<ResponseFileUploadDto[]> {
    let namesFiles = [];
    for (var file of files) {
      namesFiles.push({
        url: writeFile(file),
        typeFileId: getTypeFile(file.mimetype),
      });
    }
    return this.prisma.practicMaterial.createManyAndReturn({
      data: namesFiles,
      select: {
        id: true,
        url: true,
      },
    });
  }

  async updateIdFile(
    fileId: Array<number>,
    idQuestion: number,
  ): Promise<number> {
    const updateCount = await this.prisma.practicMaterial.updateMany({
      where: {
        id: {
          in: fileId,
        },
      },
      data: {
        questionId: idQuestion,
      },
    });
    return updateCount.count;
  }

  async gelAll(
    materialArgs: GetPracticMaterialArgs,
  ): Promise<PracticMaterial[]> {
    return this.prisma.practicMaterial.findMany({
      where: {
        AND: [
          {
            typeFileId: materialArgs.typeFileId,
          },
          {
            questionId: materialArgs.questionId,
          },
        ],
      },
    });
  }

  async delete(id: number) {
    return this.prisma.practicMaterial.delete({
      where: {
        id: id,
      },
    });
  }
}
