import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RankService } from './rank.service';
import { RankModel } from './model/rank.model';
import { Rank } from '@prisma/client';

@Resolver(() => RankModel)
export class RankResolver {
  constructor(private readonly rankService: RankService) {}

  @Query(() => [RankModel])
  getRankAll(): Promise<Rank[]> {
    return this.rankService.findAll();
  }

  @Mutation(() => RankModel)
  createRank(@Args('name') name: string): Promise<Rank> {
    return this.rankService.create(name);
  }

  @Mutation(() => RankModel)
  updateRank(
    @Args('name') name: string,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Rank> {
    return this.rankService.update(id, name);
  }

  @Mutation(() => RankModel)
  deleteRank(@Args('id', { type: () => Int }) id: number): Promise<Rank> {
    return this.rankService.delete(id);
  }
}
