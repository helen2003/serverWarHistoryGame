import { Global, Module } from '@nestjs/common';
import { TheoryMaterialService } from './theory-material.service';
import { TheoryMaterialController } from './theory-material.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TheoryMaterialResolver } from './theory-material.resolver';

@Global()
@Module({
  controllers: [TheoryMaterialController],
  providers: [TheoryMaterialService, PrismaService, TheoryMaterialResolver],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.resolve(__dirname, '../..', 'static'),
    }),
  ],
  exports: [TheoryMaterialService],
})
export class TheoryMaterialModule {}
