import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '@prisma/client';
import { AnswerModel } from '../../answer/model/answer.model';
import { PracticMaterialModel } from '../../practic-material/model/practic-material.model';
import { ResponceTemplateModel } from '../../responce-template/model/responce-template.model';
import { TopicModel } from '../../topic/model/topic.model';
import { TypeMiniGameModel } from '../../type-mini-game/model/type-mini-game.model';
import { TypeTaskModel } from '../../type-task/model/type-task.model';

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

  @Field(() => [AnswerModel])
  Answer: AnswerModel[];

  @Field(() => [ResponceTemplateModel])
  ResponceTemplate: ResponceTemplateModel[];

  @Field(() => [PracticMaterialModel])
  PracticMaterial: PracticMaterialModel[];

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
