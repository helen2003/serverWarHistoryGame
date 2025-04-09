import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Topic } from '@prisma/client';
import { SubtopicModel } from '../../subtopic/model/subtopic.model';

@ObjectType()
class Count {
  @Field(() => Int)
  Question: number;
}

@ObjectType()
export class TopicModel implements Topic {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  disciplinaId: number;

  @Field(() => [SubtopicModel], { nullable: true })
  Subtopic: SubtopicModel[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;

  @Field(() => Count)
  _count: Count;
}
