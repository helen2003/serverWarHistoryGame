import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from '../question.resolver';
import { questionReqTrue, questionResTrue } from './data';
import { QuestionService } from '../question.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { TypeTaskModule } from '../../type-task/type-task.module';
import { TopicModule } from '../../topic/topic.module';
import { TypeMiniGameModule } from '../../type-mini-game/type-mini-game.module';
import { AnswerModule } from '../../answer/answer.module';
import { ResponceTemplateModule } from '../../responce-template/responce-template.module';
import { PracticMaterialModule } from '../../practic-material/practic-material.module';

describe('QuestionResolver', () => {
  let resolver: QuestionResolver;
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionResolver, QuestionService, PrismaService],
      imports: [
        TypeTaskModule,
        TopicModule,
        TypeMiniGameModule,
        AnswerModule,
        ResponceTemplateModule,
        PracticMaterialModule,
      ],
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a question', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => questionResTrue);
    expect(await resolver.createQuestion(questionReqTrue)).toEqual(
      questionResTrue,
    );
  });
});
