import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { AnswerModel } from './model/answer.model';
import { Answer, FileAnswer } from '@prisma/client';
import { UpdateAnswerInput } from './dto/input/update-answer.input';
import { FileAnswerModel } from '../file-answer/model/file-answer.model';
import { FileAnswerService } from '../file-answer/file-answer.service';
import { UsePipes } from '@nestjs/common';
import { AnswerUpdateValidationPipe } from 'src/common/pipes/answer-update.pipes';
import { UpdateAnswerModel } from './model/update.model';

@Resolver(() => AnswerModel)
export class AnswerResolver {
  constructor(
    private readonly answerService: AnswerService,
    private fileAnswerService: FileAnswerService,
  ) {}

  @ResolveField('FileAnswer', () => FileAnswerModel, { nullable: true })
  getFileAnswer(@Parent() answer: AnswerModel): Promise<FileAnswer> {
    const { id } = answer;
    return this.fileAnswerService.getAOne(id);
  }

  @Mutation(() => UpdateAnswerModel)
  @UsePipes(new AnswerUpdateValidationPipe())
  updateAnswer(
    @Args('updateAnswerData') updateAnswerInput: UpdateAnswerInput,
  ): Promise<UpdateAnswerModel> {
    return this.answerService.update(updateAnswerInput);
  }
}
