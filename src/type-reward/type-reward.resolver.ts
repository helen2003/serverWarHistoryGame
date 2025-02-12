import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TypeRewardService } from './type-reward.service';
import { TypeRewardModel } from './model/type-reward.model';
import { TypeReward } from '@prisma/client';

@Resolver()
export class TypeRewardResolver {
  constructor(private readonly typeRewardService: TypeRewardService) {}

  @Query(() => [TypeRewardModel])
  getTypeRewardAll(): Promise<TypeReward[]> {
    return this.typeRewardService.findAll();
  }

  @Mutation(() => TypeRewardModel)
  createTypeReward(@Args('name') name: string): Promise<TypeReward> {
    return this.typeRewardService.create(name);
  }

  @Mutation(() => TypeRewardModel)
  updateTypeReward(
    @Args('name') name: string,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TypeReward> {
    return this.typeRewardService.update(id, name);
  }

  @Mutation(() => TypeRewardModel)
  deleteTypeReward(@Args('id', { type: () => Int }) id: number): Promise<TypeReward> {
    return this.typeRewardService.delete(id);
  }
}
