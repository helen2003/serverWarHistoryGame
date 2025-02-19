import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { PracticMaterialModel } from 'src/practic-material/model/practic-material.model';

@ArgsType()
export class GetPracticMaterialArgs extends PickType(PracticMaterialModel, [
  'questionId',
  'typeFileId',
]) {
  @Field(() => Int, { nullable: true })
  questionId: number;

  @Field(() => Int, { nullable: true })
  typeFileId: number;
}
