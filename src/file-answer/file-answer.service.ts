import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { FileAnswerFileUploadDto } from './output/response-file-upload.dto';
import { writeFile } from '../common/function/function-file';
import { FileAnswer } from '@prisma/client';

@Injectable()
export class FileAnswerService {
  constructor(private prisma: PrismaService) {}

  async create(
    file: Express.Multer.File,
    answerId: number,
  ): Promise<FileAnswerFileUploadDto> {
    const fileName = writeFile(file);
    return this.prisma.fileAnswer.create({
      data: { url: fileName, answerId: answerId },
      select: {
        id: true,
        url: true,
      },
    });
  }

  async createMany(
    files: Array<Express.Multer.File>,
    answerId: number,
  ): Promise<FileAnswerFileUploadDto[]> {
    let namesFiles = [];
    for (var file of files) {
      namesFiles.push({
        url: writeFile(file),
        answerId: answerId,
      });
    }
    return this.prisma.fileAnswer.createManyAndReturn({
      data: namesFiles,
      select: {
        id: true,
        url: true,
      },
    });
  }

  async getAll(answerId: number): Promise<FileAnswer[]> {
    return this.prisma.fileAnswer.findMany({
      where: { answerId: answerId },
    });
  }

  async delete(id: number) {
    return this.prisma.fileAnswer.delete({
      where: {
        id: id,
      },
    });
  }
}
