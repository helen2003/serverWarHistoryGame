import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { ResponceTemplateModel } from '../model/responce-template.model';

@InputType()
export class CreateUpdateResponceTemplateInput extends PickType(
  ResponceTemplateModel,
  ['text', 'questionId'],
) {
  @Field(() => String)
  text: string;

  @Field(() => Int)
  questionId: number;
}
