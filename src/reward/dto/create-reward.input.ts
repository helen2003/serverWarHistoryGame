import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RewardModel } from '../model/reward.model';

@InputType()
export class CreateUpdateRewardInput extends PickType(RewardModel, [
  'name',
  'description',
  'typeRewardId',
]) {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  typeRewardId: number;
}
