import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Topic } from '@prisma/client';
import { TheoryMaterialModel } from '../../theory-material/model/theory-material.model';

@ObjectType()
export class TopicModel implements Topic {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  disciplinaId: number;

  @Field(() => [TheoryMaterialModel])
  TheoryMaterial: TheoryMaterialModel[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
