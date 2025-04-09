import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Subtopic } from '@prisma/client';
import { TheoryMaterialModel } from '../../theory-material/model/theory-material.model';

@ObjectType()
export class SubtopicModel implements Subtopic {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  topicId: number;

  @Field(() => [TheoryMaterialModel], { nullable: true })
  TheoryMaterial: TheoryMaterialModel[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
