import { Test, TestingModule } from '@nestjs/testing';
import { TopicResolver } from './topic.resolver';
import { TopicService } from './topic.service';
import { TheoryMaterialModule } from '../theory-material/theory-material.module';
import { PrismaService } from '../common/prisma/prisma.service';

let resolver: TopicResolver;
let service: TopicService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [TopicResolver, TopicService, PrismaService],
    imports: [TheoryMaterialModule],
  }).compile();

  resolver = module.get<TopicResolver>(TopicResolver);
  service = module.get<TopicService>(TopicService);
});

describe('TopicResolver', () => {
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return expected result', async () => {
    const result: {
      name: string;
      id: number;
      disciplinaId: number;
      created_at: Date;
      updated_at: Date;
      deleted_at: null;
    } = {
      name: 'string',
      id: 1,
      disciplinaId: 1,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await resolver.createTopic('string', 1)).toBe(result);
    // expect(await resolver.createTopic('string', 1)).toBe(null);
  });
});
