import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { ResponceTemplateModel } from '../model/responce-template.model';

@InputType()
export class CreateResponceTemplateInput extends PickType(
  ResponceTemplateModel,
  ['text'],
) {
  @Field(() => String)
  text: string;
}
