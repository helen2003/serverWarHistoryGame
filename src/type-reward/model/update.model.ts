import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTypeRewardModel {
  @Field(() => Int)
  count: number;
}
