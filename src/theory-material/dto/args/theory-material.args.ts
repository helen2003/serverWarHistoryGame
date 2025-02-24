import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { TheoryMaterialModel } from '../../../theory-material/model/theory-material.model';

@ArgsType()
export class GetTheoryMaterialMArgs extends PickType(TheoryMaterialModel, [
  'topicId',
  'typeFileId',
]) {
  @Field(() => Int, { nullable: true })
  topicId: number;

  @Field(() => Int, { nullable: true })
  typeFileId: number;
}
