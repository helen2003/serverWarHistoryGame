import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { TheoryMaterial } from '@prisma/client';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { GetTheoryMaterialMArgs } from './dto/args/theory-material.args';

@Injectable()
export class TheoryMaterialService {
  constructor(private prisma: PrismaService) {}

  private writeFile(file: Express.Multer.File): string {
    try {
      let file_extension = file.originalname.slice(
        (Math.max(0, file.originalname.lastIndexOf('.')) || Infinity) + 1,
      );
      const fileName = uuid.v4() + `.${file_extension}`;
      const filePath = path.resolve(__dirname, '../..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getTypeFile(mimetype: string): number {
    let mimeTypeFile = mimetype.split('/');
    switch (mimeTypeFile[0]) {
      case 'image':
        return 1;
      case 'video':
        return 2;
      case 'audio':
        return 3;
      case 'application':
        return 4;
    }
  }

  async create(file: Express.Multer.File): Promise<ResponseFileUploadDto> {
    const fileName = this.writeFile(file);
    return this.prisma.theoryMaterial.create({
      data: { url: fileName, typeFileId: this.getTypeFile(file.mimetype) },
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
        url: this.writeFile(file),
        typeFileId: this.getTypeFile(file.mimetype),
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
    idProduct: number,
  ): Promise<number> {
    const updateCount = await this.prisma.theoryMaterial.updateMany({
      where: {
        id: {
          in: fileId,
        },
      },
      data: {
        topicId: idProduct,
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
