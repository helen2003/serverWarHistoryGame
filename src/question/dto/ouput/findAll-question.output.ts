import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionModel } from '../../../question/model/question.model';

@ObjectType()
export class QuestionAllOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [QuestionModel])
  Questions: QuestionModel[];
}
