import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserModel {
  @Field(() => Int)
  count: number;
}
