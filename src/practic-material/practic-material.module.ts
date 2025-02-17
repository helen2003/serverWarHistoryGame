import { Module } from '@nestjs/common';
import { PracticMaterialService } from './practic-material.service';
import { PracticMaterialController } from './practic-material.controller';

@Module({
  controllers: [PracticMaterialController],
  providers: [PracticMaterialService],
})
export class PracticMaterialModule {}
