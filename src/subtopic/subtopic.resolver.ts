import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SubtopicService } from './subtopic.service';
import { TheoryMaterialService } from '../theory-material/theory-material.service';
import { TheoryMaterialModel } from '../theory-material/model/theory-material.model';
import { SubtopicModel } from './model/subtopic.model';
import { Subtopic, TheoryMaterial } from '@prisma/client';
import { UpdateSubtopicModel } from './model/update.model';
import { UpdateSubtopicInput } from './dto/input/update-model.input';

@Resolver(() => SubtopicModel)
export class SubtopicResolver {
  constructor(
    private readonly subtopicService: SubtopicService,
    private theoryMaterialSevise: TheoryMaterialService,
  ) {}

  @Mutation(() => SubtopicModel)
  createSubtopic(
    @Args('name') name: string,
    @Args('topicId', { type: () => Int, nullable: true })
    topicId: number,
  ): Promise<Subtopic> {
    return this.subtopicService.create(name, topicId);
  }

  @Query(() => [SubtopicModel])
  getSubtopicAllByTopic(
    @Args('topicId', { type: () => Int, nullable: true }) topicId: number,
  ): Promise<Subtopic[]> {
    return this.subtopicService.findAllByTopic(topicId);
  }

  @Query(() => SubtopicModel)
  getSubtopicOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Subtopic> {
    return this.subtopicService.findOne(id);
  }

  @ResolveField('TheoryMaterial', () => [TheoryMaterialModel], {
    nullable: true,
  })
  getTheoryMaterial(
    @Parent() subtopic: SubtopicModel,
    @Args('idTypeFile', { nullable: true }) idTypeFile: number | null,
  ): Promise<TheoryMaterial[]> {
    const { id } = subtopic;
    return this.theoryMaterialSevise.gelAll({
      subtopicId: id,
      typeFileId: idTypeFile,
    });
  }

    @Mutation(() => UpdateSubtopicModel)
    updateSubtopic(
      @Args('updateSubtopicData') updateSubtopicData: UpdateSubtopicInput,
    ): Promise<Subtopic> {
      return this.subtopicService.update(updateSubtopicData);
    }
  
    @Mutation(() => SubtopicModel)
    deleteSubtopic(@Args('id', { type: () => Int }) id: number): Promise<Subtopic> {
      return this.subtopicService.delete(id);
    }
}
