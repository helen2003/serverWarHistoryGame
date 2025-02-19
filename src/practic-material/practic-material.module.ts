import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PracticMaterialService } from './practic-material.service';
import { PracticMaterialController } from './practic-materialcontroller';
import { PracticMaterialResolver } from './practic-material.resolver';
import { TypeFileModule } from 'src/type-file/type-file.module';

@Global()
@Module({
  controllers: [PracticMaterialController],
  providers: [PracticMaterialService, PrismaService, PracticMaterialResolver],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.resolve(__dirname, '../..', 'static'),
    }),
    TypeFileModule
  ],
  exports: [PracticMaterialService],
})
export class PracticMaterialModule {}
