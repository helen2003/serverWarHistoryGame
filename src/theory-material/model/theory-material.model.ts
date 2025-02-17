import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { TheoryMaterial } from '@prisma/client';

@ObjectType()
export class TheoryMaterialModel implements TheoryMaterial {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  topicId: number;

  @Field(() => Int)
  typeFileId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
