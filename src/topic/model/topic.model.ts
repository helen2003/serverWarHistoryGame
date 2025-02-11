import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Topic } from '@prisma/client';

@ObjectType()
export class TopicModel implements Topic {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  disciplinaId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  deleted_at: Date;
}
