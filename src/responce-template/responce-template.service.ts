import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponceTemplate } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { UpdateResponceTemplateInput } from './dto/update-response-template.input';

@Injectable()
export class ResponceTemplateService {
  constructor(private prisma: PrismaService) {}

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
    updateResponceTemplateData: UpdateResponceTemplateInput,
  ): Promise<ResponceTemplate> {
    return this.prisma.responceTemplate.update({
      where: {
        id: updateResponceTemplateData.id,
      },
      data: {
        text: updateResponceTemplateData.text,
      },
    });
  }

  async delete(id: number, questionId: number): Promise<ResponceTemplate> {
    const countResponseTemplate: number =
      await this.prisma.responceTemplate.count({
        where: {
          questionId: questionId,
        },
      });
    if (countResponseTemplate < 2)
      throw new HttpException(
        'Нельзя удалить шаблон ответа',
        HttpStatus.BAD_REQUEST,
      );
    return this.prisma.responceTemplate.delete({
      where: { id },
    });
  }
}
