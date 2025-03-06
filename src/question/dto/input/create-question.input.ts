import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { QuestionModel } from '../../model/question.model';
import { CreateAnswerInput } from '../../../answer/dto/input/create-answer.input';
import { CreateResponceTemplateInput } from '../../../responce-template/dto/create-responce-template.input';

@InputType()
export class CreateQuestionInput extends PickType(QuestionModel, [
  'text',
  'topicId',
  'scaleImportantId',
  'typeMiniGameId',
  'typeTaskId',
]) {
  @Field(() => String)
  text: string;

  @Field(() => Int, { nullable: true })
  scaleImportantId: number;

  @Field(() => Int)
  topicId: number;

  @Field(() => Int)
  typeMiniGameId: number;

  @Field(() => Int)
  typeTaskId: number;

  @Field(() => [CreateAnswerInput])
  Answer: CreateAnswerInput[];

  @Field(() => [CreateResponceTemplateInput])
  ResponceTemplate: CreateResponceTemplateInput[];
}
