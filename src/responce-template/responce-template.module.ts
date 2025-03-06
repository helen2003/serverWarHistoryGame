import { Module } from '@nestjs/common';
import { ResponceTemplateService } from './responce-template.service';
import { ResponceTemplateResolver } from './responce-template.resolver';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [ResponceTemplateResolver, ResponceTemplateService, PrismaService],
  exports: [ResponceTemplateService]
})
export class ResponceTemplateModule {}
