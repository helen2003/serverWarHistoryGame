import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Testing } from '@prisma/client';
import { TopicModel } from '../../topic/model/topic.model';

@ObjectType()
export class TestingModel implements Testing {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  topicId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => [TopicModel], { nullable: true })
  Topic: TopicModel[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
