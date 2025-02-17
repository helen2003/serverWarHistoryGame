import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TypeTaskService } from './type-task.service';
import { TypeTask } from '@prisma/client';
import { TypeTaskModel } from './model/type-task.model';

@Resolver()
export class TypeTaskResolver {
  constructor(private readonly typeTaskService: TypeTaskService) {}

  @Query(() => [TypeTaskModel])
  getTypeTaskAll(): Promise<TypeTask[]> {
    return this.typeTaskService.findAll();
  }

  @Mutation(() => TypeTaskModel)
  createTypeTask(@Args('name') name: string): Promise<TypeTask> {
    return this.typeTaskService.create(name);
  }

  @Mutation(() => TypeTaskModel)
  updateTypeTask(
    @Args('name') name: string,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TypeTask> {
    return this.typeTaskService.update(id, name);
  }

  @Mutation(() => TypeTaskModel)
  deleteTypeTask(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TypeTask> {
    return this.typeTaskService.delete(id);
  }
}
