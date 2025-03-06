import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Achievement, TypeReward } from '@prisma/client';
import { RewardModel } from '../../reward/model/reward.model';

@ObjectType()
export class AchievementModel implements Achievement {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  rewardId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => RewardModel)
  RewardModel: RewardModel;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
