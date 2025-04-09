import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SubtopicService } from './subtopic.service';
import { TheoryMaterialService } from '../theory-material/theory-material.service';
import { TheoryMaterialModel } from '../theory-material/model/theory-material.model';
import { SubtopicModel } from './model/subtopic.model';
import { TheoryMaterial } from '@prisma/client';

@Resolver()
export class SubtopicResolver {
  constructor(
    private readonly subtopicService: SubtopicService,
    private theoryMaterialSevise: TheoryMaterialService,
  ) {}

  // @ResolveField('TheoryMaterial', () => [TheoryMaterialModel], {
  //   nullable: true,
  // })
  // getTheoryMaterial(
  //   @Parent() subtopic: SubtopicModel,
  // ): Promise<TheoryMaterial[]> {
  //   const { id } = subtopic;
  //   return this.theoryMaterialSevise.gelAll({
  //     subtopicId: id,
  //     typeFileId: null,
  //   });
  // }
}
