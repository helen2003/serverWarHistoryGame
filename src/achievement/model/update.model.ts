import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateAchievmentModel {
  @Field(() => Int)
  count: number;
}
