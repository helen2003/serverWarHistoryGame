import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { QuestionModel } from 'src/question/model/question.model';

@ArgsType()
export class GetQuestionAllArgs extends PickType(QuestionModel, [
  'scaleImportantId',
  'topicId',
  'typeMiniGameId',
  'typeTaskId',
]) {
  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => Boolean)
  random: boolean;

  @Field(() => Int, { nullable: true })
  scaleImportantId: number;

  @Field(() => Int, { nullable: true })
  topicId: number;

  @Field(() => Int, { nullable: true })
  typeMiniGameId: number;

  @Field(() => Int, { nullable: true })
  typeTaskId: number;
}
