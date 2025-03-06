import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { AchievementModel } from '../../model/achievement.model';

@InputType()
export class CreateUpdateAchievmentInput extends PickType(AchievementModel, [
  'rewardId',
  'userId',
]) {
  @Field(() => Int)
  rewardId: number;

  @Field(() => Int)
  userId: number;
}
