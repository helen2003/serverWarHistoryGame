import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TheoryMaterialService } from './theory-material.service';
import { TheoryMaterial } from '@prisma/client';
import { TheoryMaterialModel } from './model/theory-material.model';
import { GetTheoryMaterialMArgs } from './dto/args/theory-material.args';

@Resolver()
export class TheoryMaterialResolver {
  constructor(private readonly theoryMaterialService: TheoryMaterialService) {}

  @Mutation(() => Int)
  updateTheoryMaterialId(
    @Args('idFiles', { type: () => [Int] }) idFiles: Array<number>,
    @Args('idTopic', { type: () => Int }) idTopic: number,
  ): Promise<number> {
    return this.theoryMaterialService.updateIdFile(idFiles, idTopic);
  }

  @Query(() => TheoryMaterialModel)
  getAllTheoryMaterial(@Args() findAllTheoryMaterialArgs: GetTheoryMaterialMArgs): Promise<TheoryMaterial[]>{
    return this.theoryMaterialService.gelAll(findAllTheoryMaterialArgs)
  }

  @Mutation(() => TheoryMaterialModel)
  deleteTheoryMaterial(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TheoryMaterial> {
    return this.theoryMaterialService.delete(id);
  }
}
