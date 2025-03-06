import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { AchievementModel } from '../../model/achievement.model';

@ArgsType()
export class GetAchievmentArgs extends PickType(AchievementModel, [
  'rewardId',
  'userId',
]) {
  @Field(() => Int, { nullable: true })
  rewardId: number;

  @Field(() => Int, { nullable: true })
  userId: number;
}
