import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestingService } from './testing.service';
import { TestingModel } from './model/testing.model';

@Resolver(() => TestingModel)
export class TestingResolver {
  constructor(private readonly testingService: TestingService) {}

  // @Mutation(() => TestingModel)
  // createTesting(
  //   @Args('createTestingInput') createTestingInput: CreateTestingInput,
  // ) {
  //   return this.testingService.create(createTestingInput);
  // }

  // @Query(() => [TestingModel], { name: 'testing' })
  // findAll() {
  //   return this.testingService.findAll();
  // }

  // @Query(() => TestingModel, { name: 'testing' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.testingService.findOne(id);
  // }

  // @Mutation(() => TestingModel)
  // updateTesting(
  //   @Args('updateTestingInput') updateTestingInput: UpdateTestingInput,
  // ) {
  //   return this.testingService.update(
  //     updateTestingInput.id,
  //     updateTestingInput,
  //   );
  // }

  // @Mutation(() => TestingModel)
  // deleteTesting(@Args('id', { type: () => Int }) id: number) {
  //   return this.testingService.remove(id);
  // }
}
