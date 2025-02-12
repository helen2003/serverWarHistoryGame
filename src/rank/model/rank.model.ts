import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Rank } from '@prisma/client';
import { UserModel } from 'src/user/model/users.model';

@ObjectType()
export class RankModel implements Rank {
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
