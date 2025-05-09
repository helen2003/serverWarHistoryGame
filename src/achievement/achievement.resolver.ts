import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AchievementService } from './achievement.service';
import { AchievementModel } from './model/achievement.model';
import { Achievement, Reward } from '@prisma/client';
import { GetAchievmentArgs } from './dto/args/get-all-achievment.args';
import { RewardModel } from '../reward/model/reward.model';
import { RewardService } from '../reward/reward.service';
import { CreateUpdateAchievmentInput } from './dto/input/create-update-achievment.input';
import { UpdateAchievmentModel } from './model/update.model';

@Resolver(() => AchievementModel)
export class AchievementResolver {
  constructor(
    private readonly achievementService: AchievementService,
    private rewardService: RewardService,
  ) {}

  @Query(() => [AchievementModel])
  getAchievmentAll(
    @Args() getAllAchievmentArgs: GetAchievmentArgs,
  ): Promise<Achievement[]> {
    return this.achievementService.findAll(getAllAchievmentArgs);
  }

  @ResolveField('Reward', () => [RewardModel], {
    nullable: true,
  })
  getReward(@Parent() achievement: Achievement): Promise<Reward> {
    const { rewardId } = achievement;
    return this.rewardService.findOne(rewardId);
  }

  @Mutation(() => AchievementModel)
  createAchievment(
    @Args('createAchievmentData')
    createAchievmentData: CreateUpdateAchievmentInput,
  ): Promise<Achievement> {
    return this.achievementService.create(createAchievmentData);
  }

  @Mutation(() => UpdateAchievmentModel)
  updateAchievment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAchievmentData')
    updateAchievmentData: CreateUpdateAchievmentInput,
  ): Promise<Achievement> {
    return this.achievementService.update(id, updateAchievmentData);
  }

  @Mutation(() => AchievementModel)
  deleteAchievment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Achievement> {
    return this.achievementService.delete(id);
  }
}
