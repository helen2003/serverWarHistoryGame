import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateRewardModel {
  @Field(() => Int)
  count: number;
}
