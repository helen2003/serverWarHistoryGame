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
import { Question, Topic, TypeMiniGame, TypeTask } from '@prisma/client';
import { GetQuestionAllArgs } from './dto/args/find-all-question.args';
import { TypeTaskModel } from 'src/type-task/model/type-task.model';
import { TypeTaskService } from 'src/type-task/type-task.service';
import { TopicService } from 'src/topic/topic.service';
import { TopicModel } from 'src/topic/model/topic.model';
import { TypeMiniGameService } from 'src/type-mini-game/type-mini-game.service';
import { TypeMiniGameModel } from 'src/type-mini-game/model/type-mini-game.model';

@Resolver(() => QuestionModel)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private typeTaskService: TypeTaskService,
    private topicService: TopicService,
    private typeMiniGame: TypeMiniGameService,
  ) {}

  // @Query(() => [QuestionModel])
  // getQuestionAll(
  //   @Args() findAllQuestionArgs: GetQuestionAllArgs,
  // ): Promise<Question[]> {
  //   return this.questionService.findAll(findAllQuestionArgs);
  // }

  // @Query(() => QuestionModel)
  // getQuestionAOne(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<Question> {
  //   return this.questionService.findOne(id);
  // }

  // @ResolveField('TypeTask', () => TypeTaskModel)
  // getTypeTask(@Parent() question: QuestionModel): Promise<TypeTask> {
  //   const { typeTaskId } = question;
  //   return this.typeTaskService.findOne(typeTaskId);
  // }

  // @ResolveField('Topic', () => TopicModel)
  // getTopic(@Parent() question: QuestionModel): Promise<Topic> {
  //   const { topicId } = question;
  //   return this.topicService.findOne(topicId);
  // }

  // @ResolveField('TypeMiniGame', () => TypeMiniGameModel)
  // getTypeQuestion(@Parent() question: QuestionModel): Promise<TypeMiniGame> {
  //   const { typeMiniGameId } = question;
  //   return this.typeMiniGame.findOne(typeMiniGameId);
  // }

  // @Mutation(() => QuestionModel)
  // createQuestion(
  //   @Args('createQuestionData') createQuestionInput: CreateUpdateQuestionInput,
  // ): Promise<Question> {
  //   return this.questionService.create(createQuestionInput);
  // }

  // @Mutation(() => QuestionModel)
  // updateQuestion(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('updateQuestionData') updateQuestionInput: CreateUpdateQuestionInput,
  // ): Promise<Question> {
  //   return this.questionService.update(id, updateQuestionInput);
  // }

  // @Mutation(() => QuestionModel)
  // deleteQuestion(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<Question> {
  //   return this.questionService.delete(id);
  // }
}
