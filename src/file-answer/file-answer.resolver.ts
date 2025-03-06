import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  FileAnswer,

} from '@prisma/client';
import { FileAnswerService } from './file-answer.service';
import { FileAnswerModel } from './model/file-answer.model';

@Resolver()
export class FileAnswerResolver {
  constructor(private readonly fileAnswerService: FileAnswerService) {}

  @Mutation(() => FileAnswerModel)
  deleteFileAnswer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FileAnswer> {
    return this.fileAnswerService.delete(id);
  }
}
