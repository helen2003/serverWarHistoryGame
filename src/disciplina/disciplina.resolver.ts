import { Mutation, Resolver } from '@nestjs/graphql';
import { DisciplinaService } from './disciplina.service';

@Resolver()
export class DisciplinaResolver {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  // @Mutation(() => TopicModel)
  // createTopic(
  //   @Args('name') name: string,
  //   @Args('disciplinaId', { type: () => Int }) disciplinaId: number,
  // ): Promise<Topic> {
  //   return this.topicService.create(name, disciplinaId);
  // }
}
