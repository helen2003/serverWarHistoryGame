import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Achievement, TypeReward } from '@prisma/client';

@ObjectType()
export class AchievementModel implements Achievement {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  rewardId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
