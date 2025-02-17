import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { QuestionModel } from '../../model/question.model';

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

  @Field(() => Int)
  scaleImportantId: number;

  @Field(() => Int)
  topicId: number;

  @Field(() => Int)
  typeMiniGameId: number;

  @Field(() => Int)
  typeTaskId: number;
}
