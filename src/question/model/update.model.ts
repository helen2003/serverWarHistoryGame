import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateQuestionModel {
  @Field(() => Int)
  count: number;
}
