import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { QuestionModel } from '../../model/question.model';

@InputType()
export class UpdateQuestionInput extends PickType(QuestionModel, [
  'text',
  'topicId',
  'scaleImportantId',
  'typeTaskId',
]) {
  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => Int, { nullable: true })
  scaleImportantId: number;

  @Field(() => Int, { nullable: true })
  topicId: number;

  @Field(() => Int, { nullable: true })
  typeTaskId: number;
}
