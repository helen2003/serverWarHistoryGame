import { Injectable } from '@nestjs/common';
import { Reward } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUpdateRewardInput } from './dto/create-reward.input';

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
}
