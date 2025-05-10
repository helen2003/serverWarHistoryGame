import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateAnswerModel {
  @Field(() => Int)
  count: number;
}
