import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '@prisma/client';
import { TopicModel } from 'src/topic/model/topic.model';
import { TypeMiniGameModel } from 'src/type-mini-game/model/type-mini-game.model';
import { TypeTaskModel } from 'src/type-task/model/type-task.model';

@ObjectType()
export class QuestionModel implements Question {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  topicId: number;

  @Field(() => TopicModel)
  Topic: TopicModel;

  @Field(() => Int)
  typeTaskId: number;

  @Field(() => TypeTaskModel)
  TypeTask: TypeTaskModel;

  @Field(() => Int)
  typeMiniGameId: number;

  @Field(() => TypeMiniGameModel)
  TypeMiniGame: TypeMiniGameModel;

  @Field(() => Int)
  scaleImportantId: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
