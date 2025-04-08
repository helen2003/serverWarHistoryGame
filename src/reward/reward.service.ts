import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUpdateRewardInput } from './dto/input/create-reward.input';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { writeFile } from '../common/function/function-file';

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

  async findManyByType(idTypeReward: number): Promise<Reward[]> {
    return this.prisma.reward.findMany({
      where: {
        typeRewardId: idTypeReward,
      },
    });
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

  async createImage(idReward: number, file: Express.Multer.File) {
    const fileName = writeFile(file);
    return this.prisma.reward.update({
      where: {
        id: idReward,
      },
      data: { url: fileName },
    });
  }
}
