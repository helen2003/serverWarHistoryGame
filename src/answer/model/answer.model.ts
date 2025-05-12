import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from '@prisma/client';
import { FileAnswerModel } from '../../file-answer/model/file-answer.model';

@ObjectType()
export class AnswerModel implements Answer {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  correct: string;

  @Field(() => Int)
  questionId: number;

  @Field(() => FileAnswerModel, { nullable: true })
  FileAnswer: FileAnswerModel;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
