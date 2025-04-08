import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { AnswerModel } from '../../model/answer.model';

@InputType()
export class UpdateAnswerInput extends PickType(AnswerModel, [
  'text',
  'correct',
]) {
  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  correct: string;
}
