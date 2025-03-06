import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PracticMaterial } from '@prisma/client';
import { TypeFileModel } from '../../type-file/model/type-mini-game.model';

@ObjectType()
export class PracticMaterialModel implements PracticMaterial {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  typeFileId: number;

  @Field(() => TypeFileModel)
  TypeFile: TypeFileModel;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
