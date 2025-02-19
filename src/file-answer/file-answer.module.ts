import { Global, Module } from '@nestjs/common';
import { FileAnswerService } from './file-answer.service';
import { FileAnswerController } from './file-answer.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileAnswerResolver } from './file-answer.resolver';

@Global()
@Module({
  controllers: [FileAnswerController],
  providers: [FileAnswerService, PrismaService, FileAnswerResolver],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.resolve(__dirname, '../..', 'static'),
    }),
  ],
  exports: [FileAnswerService],
})
export class FileAnswerModule {}
