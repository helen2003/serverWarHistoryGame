import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUpdateRewardInput } from './dto/input/create-reward.input';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { writeFile } from 'src/common/function/function-wrire-file';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async create(createRewardInput: CreateUpdateRewardInput): Promise<Reward> {
    return this.prisma.reward.create({ data: { ...createRewardInput } });
  }

  async findOne(id: number): Promise<Reward> {
    return this.prisma.reward.findUnique({
      where: { id: id },
    });
  }

  async findAll(): Promise<Reward[]> {
    return this.prisma.reward.findMany({});
  }

  async update(
    id: number,
    updateRewardInput: CreateUpdateRewardInput,
  ): Promise<Reward> {
    return this.prisma.reward.update({
      where: {
        id: id,
      },
      data: {
        ...updateRewardInput,
      },
    });
  }

  async delete(id: number): Promise<Reward> {
    return this.prisma.reward.delete({
      where: {
        id: id,
      },
    });
  }

  async createImage(
    id: number,
    file: Express.Multer.File,
  ): Promise<ResponseFileUploadDto> {
    const fileName = writeFile(file);
    return this.prisma.reward.update({
      where: {
        id: id,
      },
      data: { url: fileName },
      select: {
        id: true,
        url: true,
        name: true,
      },
    });
  }
}
