import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateResponceTemplateModel {
  @Field(() => Int)
  count: number;
}
