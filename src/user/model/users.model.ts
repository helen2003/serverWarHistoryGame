import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoleEnum, User } from '@prisma/client';
import { AchievementModel } from 'src/achievement/model/achievement.model';
import { RankModel } from 'src/rank/model/rank.model';

@ObjectType()
export class UserModel implements User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  login: string;

  // @HideField()
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  name: string;

  @Field()
  role: RoleEnum;

  @Field(() => Int)
  rankId: number;

  @Field(() => RankModel)
  Rank?: RankModel;

  @Field(() => [AchievementModel], { nullable: 'itemsAndList' })
  Achievement?: AchievementModel[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  // @HideField()
  deleted_at: Date;
}
