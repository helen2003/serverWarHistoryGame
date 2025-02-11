import { Field, InputType, PickType } from '@nestjs/graphql';
import { TopicModel } from '../model/topic.model';

@InputType()
export class CreateTopicInput extends PickType(TopicModel, ['name']) {
  @Field(() => String)
  name: string;
}
