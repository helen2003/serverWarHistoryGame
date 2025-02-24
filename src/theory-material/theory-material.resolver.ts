import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TheoryMaterialService } from './theory-material.service';
import { TheoryMaterial, TypeFile } from '@prisma/client';
import { TheoryMaterialModel } from './model/theory-material.model';
import { GetTheoryMaterialMArgs } from './dto/args/theory-material.args';
import { TypeFileService } from '../type-file/type-file.service';
import { TypeFileModel } from '../type-file/model/type-mini-game.model';

@Resolver(() => TheoryMaterialModel)
export class TheoryMaterialResolver {
  constructor(
    private readonly theoryMaterialService: TheoryMaterialService,
    private typeFileService: TypeFileService,
  ) {}

  @Mutation(() => Int)
  updateTheoryMaterialId(
    @Args('idFiles', { type: () => [Int] }) idFiles: Array<number>,
    @Args('idTopic', { type: () => Int }) idTopic: number,
  ): Promise<number> {
    return this.theoryMaterialService.updateIdFile(idFiles, idTopic);
  }

  @Query(() => TheoryMaterialModel)
  getAllTheoryMaterial(
    @Args() findAllTheoryMaterialArgs: GetTheoryMaterialMArgs,
  ): Promise<TheoryMaterial[]> {
    return this.theoryMaterialService.gelAll(findAllTheoryMaterialArgs);
  }

  @Mutation(() => TheoryMaterialModel)
  deleteTheoryMaterial(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TheoryMaterial> {
    return this.theoryMaterialService.delete(id);
  }

  @ResolveField('TypeFile', () => TypeFileModel)
  getTypeFile(@Parent() material: TheoryMaterialModel): Promise<TypeFile> {
    const { typeFileId } = material;
    return this.typeFileService.findOne(typeFileId);
  }
}
