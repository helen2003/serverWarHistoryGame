import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTopicModel {
  @Field(() => Int)
  count: number;
}
