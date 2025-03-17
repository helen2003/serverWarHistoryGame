import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { TopicModel } from './model/topic.model';
import { TheoryMaterial, Topic } from '@prisma/client';
import { UpdateTopicInput } from './dto/input/update-model.input';
import { TheoryMaterialModel } from '../theory-material/model/theory-material.model';
import { TheoryMaterialService } from '../theory-material/theory-material.service';

@Resolver(() => TopicModel)
export class TopicResolver {
  constructor(
    private readonly topicService: TopicService,
    private theoryMaterialSevise: TheoryMaterialService,
  ) {}

  @Query(() => [TopicModel])
  getTopicAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Query(() => TopicModel)
  getTopicOne(@Args('id') id: number): Promise<Topic> {
    return this.topicService.findOne(id);
  }

  @ResolveField('TheoryMaterial', () => [TheoryMaterialModel], {
    nullable: true,
  })
  getTheoryMaterial(@Parent() topic: TopicModel): Promise<TheoryMaterial[]> {
    const { id } = topic;
    return this.theoryMaterialSevise.gelAll({ topicId: id, typeFileId: null });
  }

  @Mutation(() => TopicModel)
  createTopic(
    @Args('name') name: string,
    @Args('disciplinaId', { type: () => Int, nullable: true })
    disciplinaId: number,
  ): Promise<Topic> {
    return this.topicService.create(name, disciplinaId);
  }

  @Mutation(() => TopicModel)
  updateTopic(
    @Args('updateTopicData') updateTopicData: UpdateTopicInput,
  ): Promise<Topic> {
    return this.topicService.update(updateTopicData);
  }

  @Mutation(() => TopicModel)
  deleteTopic(@Args('id', { type: () => Int }) id: number): Promise<Topic> {
    return this.topicService.delete(id);
  }
}
