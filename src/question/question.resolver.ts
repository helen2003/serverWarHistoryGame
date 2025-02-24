import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { QuestionModel } from './model/question.model';
import {
  Answer,
  PracticMaterial,
  Question,
  ResponceTemplate,
  Topic,
  TypeMiniGame,
  TypeTask,
} from '@prisma/client';
import { GetQuestionAllArgs } from './dto/args/find-all-question.args';
import { TypeTaskModel } from 'src/type-task/model/type-task.model';
import { TypeTaskService } from 'src/type-task/type-task.service';
import { TopicService } from 'src/topic/topic.service';
import { TopicModel } from 'src/topic/model/topic.model';
import { TypeMiniGameService } from 'src/type-mini-game/type-mini-game.service';
import { TypeMiniGameModel } from 'src/type-mini-game/model/type-mini-game.model';
import { AnswerService } from 'src/answer/answer.service';
import { AnswerModel } from 'src/answer/model/answer.model';
import { ResponceTemplateService } from 'src/responce-template/responce-template.service';
import { CreateQuestionInput } from './dto/input/create-question.input';
import { UpdateQuestionInput } from './dto/input/update-question.input';
import { PracticMaterialService } from 'src/practic-material/practic-material.service';
import { ResponceTemplateModel } from 'src/responce-template/model/responce-template.model';
import { PracticMaterialModel } from 'src/practic-material/model/practic-material.model';
import { QuestionAllOutput } from './dto/ouput/findAll-question.output';

@Resolver(() => QuestionModel)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private typeTaskService: TypeTaskService,
    private topicService: TopicService,
    private typeMiniGameService: TypeMiniGameService,
    private answerService: AnswerService,
    private responseTemplateService: ResponceTemplateService,
    private practicMaterialService: PracticMaterialService,
  ) {}

  @Query(() => QuestionAllOutput)
  getQuestionAll(@Args() findAllQuestionArgs: GetQuestionAllArgs) {
    return this.questionService.findAll(findAllQuestionArgs);
  }

  @Query(() => QuestionModel)
  getQuestionAOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @ResolveField('ResponceTemplate', () => ResponceTemplateModel, {
    nullable: true,
  })
  getResponseTemplate(
    @Parent() question: QuestionModel,
  ): Promise<ResponceTemplate> {
    const { id } = question;
    return this.responseTemplateService.findOne(id);
  }

  @ResolveField('PracticMaterial', () => [PracticMaterialModel])
  getPracticMaterial(
    @Parent() question: QuestionModel,
  ): Promise<PracticMaterial[]> {
    const { id } = question;
    return this.practicMaterialService.gelAll({
      questionId: id,
      typeFileId: null,
    });
  }

  @ResolveField('TypeTask', () => TypeTaskModel)
  getTypeTask(@Parent() question: QuestionModel): Promise<TypeTask> {
    const { typeTaskId } = question;
    return this.typeTaskService.findOne(typeTaskId);
  }

  @ResolveField('Topic', () => TopicModel)
  getTopic(@Parent() question: QuestionModel): Promise<Topic> {
    const { topicId } = question;

    return this.topicService.findOne(topicId);
  }

  @ResolveField('Answer', () => [AnswerModel])
  getAnswer(@Parent() question: QuestionModel): Promise<Answer[]> {
    const { id } = question;
    return this.answerService.findAllByTask(id);
  }

  @ResolveField('TypeMiniGame', () => TypeMiniGameModel)
  getTypeMiniGame(@Parent() question: QuestionModel): Promise<TypeMiniGame> {
    const { typeMiniGameId } = question;
    return this.typeMiniGameService.findOne(typeMiniGameId);
  }

  @Mutation(() => QuestionModel)
  createQuestion(
    @Args('createQuestionData') createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionService.create(createQuestionInput);
  }

  @Mutation(() => QuestionModel)
  updateQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQuestionData') updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionService.update(id, updateQuestionInput);
  }

  @Mutation(() => QuestionModel)
  deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question> {
    return this.questionService.delete(id);
  }
}
