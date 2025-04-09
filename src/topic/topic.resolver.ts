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
import { Subtopic, TheoryMaterial, Topic } from '@prisma/client';
import { UpdateTopicInput } from './dto/input/update-model.input';
import { SubtopicModel } from '../subtopic/model/subtopic.model';
import { SubtopicService } from '../subtopic/subtopic.service';

@Resolver(() => TopicModel)
export class TopicResolver {
  constructor(
    private readonly topicService: TopicService,
    private subtopicSevise: SubtopicService,
  ) {}

  @Query(() => [TopicModel])
  getTopicAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Query(() => TopicModel)
  getTopicOne(@Args('id') id: number): Promise<Topic> {
    return this.topicService.findOne(id);
  }

  @ResolveField('Subtopic', () => [SubtopicModel], {
    nullable: true,
  })
  getSubtopic(@Parent() topic: TopicModel): Promise<Subtopic[]> {
    const { id } = topic;
    return this.subtopicSevise.findAllByTopic(id);
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
