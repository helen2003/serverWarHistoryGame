import { Injectable } from '@nestjs/common';
import { Achievement } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { GetAchievmentArgs } from './dto/args/get-all-achievment.args';
import { CreateUpdateAchievmentInput } from './dto/input/create-update-achievment.input';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAchievmentData: CreateUpdateAchievmentInput,
  ): Promise<Achievement> {
    return this.prisma.achievement.create({
      data: { ...createAchievmentData },
    });
  }

  async findAll(achievementArgs: GetAchievmentArgs): Promise<Achievement[]> {
    return this.prisma.achievement.findMany({
      where: {
        AND: [
          {
            rewardId: achievementArgs.rewardId,
          },
          {
            userId: achievementArgs.userId,
          },
        ],
      },
    });
  }

  async update(
    id: number,
    createAchievmentInput: CreateUpdateAchievmentInput,
  ): Promise<Achievement> {
    return this.prisma.achievement.update({
      where: {
        id: id,
      },
      data: {
        ...createAchievmentInput,
      },
    });
  }

  async delete(id: number): Promise<Achievement> {
    return this.prisma.achievement.delete({
      where: {
        id: id,
      },
    });
  }
}
