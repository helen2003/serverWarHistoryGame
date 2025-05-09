import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateRankModel {
  @Field(() => Int)
  count: number;
}
