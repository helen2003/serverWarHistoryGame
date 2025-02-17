import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from '@prisma/client';

@ObjectType()
export class AnswerModel implements Answer {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  questionId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
