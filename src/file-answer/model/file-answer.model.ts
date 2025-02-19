import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { FileAnswer, TheoryMaterial } from '@prisma/client';

@ObjectType()
export class FileAnswerModel implements FileAnswer {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  answerId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
