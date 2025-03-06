import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Reward } from '@prisma/client';
import { TypeRewardModel } from '../../type-reward/model/type-reward.model';

@ObjectType()
export class RewardModel implements Reward {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  typeRewardId: number;

  @Field(() => String)
  url: string;

  @Field(() => TypeRewardModel)
  TypeReward: TypeRewardModel;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
