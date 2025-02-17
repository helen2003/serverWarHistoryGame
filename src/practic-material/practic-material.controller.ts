import { Controller } from '@nestjs/common';
import { PracticMaterialService } from './practic-material.service';

@Controller('practic-material')
export class PracticMaterialController {
  constructor(private readonly practicMaterialService: PracticMaterialService) {}
}
