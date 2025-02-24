import { Global, Module } from '@nestjs/common';
import { TheoryMaterialService } from './theory-material.service';
import { TheoryMaterialController } from './theory-material.controller';
import { PrismaService } from '../common/prisma/prisma.service';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TheoryMaterialResolver } from './theory-material.resolver';
import { TypeFileModule } from '../type-file/type-file.module';

@Global()
@Module({
  controllers: [TheoryMaterialController],
  providers: [TheoryMaterialService, PrismaService, TheoryMaterialResolver],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.resolve(__dirname, '../..', 'static'),
    }),
    TypeFileModule,
  ],
  exports: [TheoryMaterialService],
})
export class TheoryMaterialModule {}
