import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateSubtopicModel {
  @Field(() => Int)
  count: number;
}
