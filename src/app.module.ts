import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';
import { RankModule } from './rank/rank.module';
import { TypeRewardModule } from './type-reward/type-reward.module';
import { RewardModule } from './reward/reward.module';
import { AchievementModule } from './achievement/achievement.module';
import { TypeMiniGameModule } from './type-mini-game/type-mini-game.module';
import { TypeTaskModule } from './type-task/type-task.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { ResponceTemplateModule } from './responce-template/responce-template.module';
import { TheoryMaterialModule } from './theory-material/theory-material.module';
import { PracticMaterialModule } from './practic-material/practic-material.module';
import { TypeFileModule } from './type-file/type-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    UserModule,
    TopicModule,
    RankModule,
    TypeRewardModule,
    RewardModule,
    AchievementModule,
    TypeMiniGameModule,
    TypeTaskModule,
    QuestionModule,
    AnswerModule,
    ResponceTemplateModule,
    TheoryMaterialModule,
    PracticMaterialModule,
    TypeFileModule,
  ],
})
export class AppModule {}
