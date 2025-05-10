import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { AnswerModel } from '../../model/answer.model';

@InputType()
export class UpdateAnswer extends PickType(AnswerModel, ['id', 'text', 'correct']) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  correct: string;
}

@InputType()
export class UpdateAnswerInput {
  @Field(() => [UpdateAnswer])
  answerData: UpdateAnswer[];

  @Field(() => Int)
  typeMiniGameId: number;
}
