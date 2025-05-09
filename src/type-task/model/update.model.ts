import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTypeTaskModel {
  @Field(() => Int)
  count: number;
}
