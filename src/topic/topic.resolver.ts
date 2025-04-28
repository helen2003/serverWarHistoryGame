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
import { Question, Subtopic, TheoryMaterial, Topic } from '@prisma/client';
import { UpdateTopicInput } from './dto/input/update-model.input';
import { SubtopicModel } from '../subtopic/model/subtopic.model';
import { SubtopicService } from '../subtopic/subtopic.service';
import { QuestionService } from 'src/question/question.service';
import { QuestionModel } from 'src/question/model/question.model';

@Resolver(() => TopicModel)
export class TopicResolver {
  constructor(
    private readonly topicService: TopicService,
    private subtopicSevise: SubtopicService,
    private questionService: QuestionService,
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

  @ResolveField('Question', () => [QuestionModel], {
    nullable: true,
  })
  getQuestions(@Parent() topic: TopicModel) {
    const { id } = topic;
    return this.questionService.findAllByTopic(id);
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
