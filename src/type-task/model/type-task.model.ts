import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TypeTask } from '@prisma/client';

@ObjectType()
export class TypeTaskModel implements TypeTask {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
