import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TopicModel } from './model/topic.model';
import { CreateTopicInput } from './dto/create-topic.dto';

@Resolver()
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Roles('TEACHER')
  @Mutation(() => TopicModel)
  createTopic(
    @Args('createTopicInput') createTopicInput: CreateTopicInput,
  ) {
    return this.topicService.create(createTopicInput);
  }

  @Roles('TEACHER', 'STUDENT')
  @Mutation(() => TopicModel)
  findAllTopic() {
    return this.topicService.findAll();
  }
}
