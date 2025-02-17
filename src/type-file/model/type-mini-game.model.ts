import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TypeFile, TypeMiniGame } from '@prisma/client';

@ObjectType()
export class TypeFileModel implements TypeFile {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
