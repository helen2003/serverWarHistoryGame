import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TheoryMaterial } from '@prisma/client';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { GetTheoryMaterialMArgs } from './dto/args/theory-material.args';
import { getTypeFile, writeFile } from 'src/common/function/function-wrire-file';

@Injectable()
export class TheoryMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File): Promise<ResponseFileUploadDto> {
    const fileName = writeFile(file);
    return this.prisma.theoryMaterial.create({
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
    idTopic: number,
  ): Promise<number> {
    const updateCount = await this.prisma.theoryMaterial.updateMany({
      where: {
        id: {
          in: fileId,
        },
      },
      data: {
        topicId: idTopic,
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
            topicId: materialArgs.topicId,
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
