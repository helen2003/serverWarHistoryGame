import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { SubtopicModel } from '../../model/subtopic.model';

@InputType()
export class UpdateSubtopicInput extends PickType(SubtopicModel, [
  'id',
  'name',
  'topicId',
]) {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  topicId: number;

  @Field(() => Int)
  id: number;
}
