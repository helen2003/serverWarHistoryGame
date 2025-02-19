import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { ResponceTemplateModel } from '../model/responce-template.model';

@InputType()
export class UpdateResponceTemplateInput extends PickType(
  ResponceTemplateModel,
  ['id', 'text', 'questionId'],
) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Int)
  questionId: number;
}
