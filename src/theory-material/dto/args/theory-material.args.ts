import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { TheoryMaterialModel } from '../../../theory-material/model/theory-material.model';

@ArgsType()
export class GetTheoryMaterialMArgs extends PickType(TheoryMaterialModel, [
  'subtopicId',
  'typeFileId',
]) {
  @Field(() => Int, { nullable: true })
  subtopicId: number;

  @Field(() => Int, { nullable: true })
  typeFileId: number;
}
