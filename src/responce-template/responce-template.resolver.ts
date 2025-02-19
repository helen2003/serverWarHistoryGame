import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ResponceTemplateService } from './responce-template.service';
import { ResponceTemplateModel } from './model/responce-template.model';
import { ResponceTemplate } from '@prisma/client';
import { UpdateResponceTemplateInput } from './dto/update-response-template.input';

@Resolver()
export class ResponceTemplateResolver {
  constructor(
    private readonly responceTemplateService: ResponceTemplateService,
  ) {}

  @Mutation(() => ResponceTemplateModel)
  updateQuestion(
    @Args('updateResponceTemplateData')
    updateResponceTemplateData: UpdateResponceTemplateInput,
  ): Promise<ResponceTemplate> {
    return this.responceTemplateService.update(updateResponceTemplateData);
  }

  @Mutation(() => ResponceTemplateModel)
  deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<ResponceTemplate> {
    return this.responceTemplateService.delete(id, questionId);
  }
}
