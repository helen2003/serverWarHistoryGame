import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PracticMaterial, TheoryMaterial, TypeFile } from '@prisma/client';
import { PracticMaterialService } from './practic-material.service';
import { PracticMaterialModel } from './model/practic-material.model';
import { GetPracticMaterialArgs } from './dto/args/practic-material.args';
import { TypeFileModel } from '../type-file/model/type-mini-game.model';
import { TypeFileService } from '../type-file/type-file.service';

@Resolver(() => PracticMaterialModel)
export class PracticMaterialResolver {
  constructor(
    private readonly practicMaterialService: PracticMaterialService,
    private typeFileService: TypeFileService,
  ) {}

  @Mutation(() => Int)
  updatePracticMaterialId(
    @Args('idFiles', { type: () => [Int] }) idFiles: Array<number>,
    @Args('idQuestion', { type: () => Int }) idQuestion: number,
  ): Promise<number> {
    return this.practicMaterialService.updateIdFile(idFiles, idQuestion);
  }

  @Query(() => PracticMaterialModel)
  getAllPracticMaterial(
    @Args() findAllPracticMaterialArgs: GetPracticMaterialArgs,
  ): Promise<PracticMaterial[]> {
    return this.practicMaterialService.gelAll(findAllPracticMaterialArgs);
  }

  @Mutation(() => PracticMaterialModel)
  deletePracticMaterial(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PracticMaterial> {
    return this.practicMaterialService.delete(id);
  }

  @ResolveField('TypeFile', () => TypeFileModel)
  getTypeFile(@Parent() material: PracticMaterialModel): Promise<TypeFile> {
    const { typeFileId } = material;
    return this.typeFileService.findOne(typeFileId);
  }
}
