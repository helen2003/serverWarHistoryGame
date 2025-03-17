import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { TopicModel } from '../../model/topic.model';

@InputType()
export class UpdateTopicInput extends PickType(TopicModel, [
  'id',
  'name',
  'disciplinaId',
]) {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  disciplinaId: number;

  @Field(() => Int)
  id: number;
}
