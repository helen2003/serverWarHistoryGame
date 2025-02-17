import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponceTemplate } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUpdateResponceTemplateInput } from './dto/create-update-responce-template.input';

@Injectable()
export class ResponceTemplateService {
  constructor(private prisma: PrismaService) {}

  async create(
    createResponceTemplateData: CreateUpdateResponceTemplateInput,
  ): Promise<ResponceTemplate> {
    return this.prisma.responceTemplate.create({
      data: { ...createResponceTemplateData },
    });
  }

  async findOne(questionId?: number, id?: number): Promise<ResponceTemplate> {
    if ((questionId && id) || !(questionId || id)) {
      throw new HttpException('Ошибка запроса', HttpStatus.BAD_REQUEST);
    }
    if (questionId)
      return this.prisma.responceTemplate.findFirst({
        where: { questionId: questionId },
      });
    else
      return this.prisma.responceTemplate.findUnique({
        where: { id: id },
      });
  }

  async update(
    id: number,
    updateResponceTemplateData: CreateUpdateResponceTemplateInput,
  ): Promise<ResponceTemplate> {
    return this.prisma.responceTemplate.update({
      where: {
        id: id,
      },
      data: {
        ...updateResponceTemplateData,
      },
    });
  }
}
