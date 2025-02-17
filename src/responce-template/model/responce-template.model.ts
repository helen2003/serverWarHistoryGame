import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResponceTemplate } from '@prisma/client';

@ObjectType()
export class ResponceTemplateModel implements ResponceTemplate {
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
