import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TypeMiniGameService } from './type-mini-game.service';
import { TypeMiniGameModel } from './model/type-mini-game.model';
import { TypeMiniGame } from '@prisma/client';

@Resolver()
export class TypeMiniGameResolver {
  constructor(private readonly typeMiniGameService: TypeMiniGameService) {}

  @Query(() => [TypeMiniGameModel])
  getMiniGameAll(): Promise<TypeMiniGame[]> {
    return this.typeMiniGameService.findAll();
  }

  // Нельзя изменять данные

  // @Mutation(() => TypeMiniGameModel)
  // createMiniGame(@Args('name') name: string): Promise<TypeMiniGame> {
  //   return this.typeMiniGameService.create(name);
  // }

  // @Mutation(() => TypeMiniGameModel)
  // updateMiniGame(
  //   @Args('name') name: string,
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<TypeMiniGame> {
  //   return this.typeMiniGameService.update(id, name);
  // }

  // @Mutation(() => TypeMiniGameModel)
  // deleteMiniGame(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<TypeMiniGame> {
  //   return this.typeMiniGameService.delete(id);
  // }
}
