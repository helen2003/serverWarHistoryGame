import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RewardService } from './reward.service';
import { RewardModel } from './model/reward.model';
import { Reward, TypeReward } from '@prisma/client';
import { CreateUpdateRewardInput } from './dto/input/create-reward.input';
import { TypeRewardService } from '../type-reward/type-reward.service';
import { TypeRewardModel } from '../type-reward/model/type-reward.model';
import { UpdateRewardModel } from './model/update.model';

@Resolver(() => RewardModel)
export class RewardResolver {
  constructor(
    private readonly rewardService: RewardService,
    private typeRewardService: TypeRewardService,
  ) {}

  @Query(() => [RewardModel])
  getRewardAll(): Promise<Reward[]> {
    return this.rewardService.findAll();
  }

  @Query(() => [RewardModel])
  getRewardByType(@Args('id', { type: () => Int }) id: number): Promise<Reward[]> {
    return this.rewardService.findManyByType(id);
  }

  @Query(() => RewardModel)
  getRewardAOne(@Args('id', { type: () => Int }) id: number): Promise<Reward> {
    return this.rewardService.findOne(id);
  }

  @ResolveField('TypeReward', () => TypeRewardModel, { nullable: true })
  getTypeReward(@Parent() reward: RewardModel): Promise<TypeReward> {
    const { typeRewardId } = reward;
    return this.typeRewardService.findOne(typeRewardId);
  }

  @Mutation(() => RewardModel)
  createReward(
    @Args('createRewardData') createRewardInput: CreateUpdateRewardInput,
  ): Promise<Reward> {
    return this.rewardService.create(createRewardInput);
  }

  @Mutation(() => UpdateRewardModel)
  updateReward(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRewardData') updateRewardInput: CreateUpdateRewardInput,
  ): Promise<Reward> {
    return this.rewardService.update(id, updateRewardInput);
  }

  @Mutation(() => RewardModel)
  deleteReward(@Args('id', { type: () => Int }) id: number): Promise<Reward> {
    return this.rewardService.delete(id);
  }
}
