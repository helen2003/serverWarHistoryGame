import {
  Controller,
  Post,
  Put,
  Query,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { ApiOneFileWithIdQuery } from '../common/decorators/api-file.decorator';
import { FileValidationPipe } from '../common/pipes/file-validation.pipes';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('upload-file')
  @ApiOneFileWithIdQuery()
  uploadFile(
    @UploadedFile(new FileValidationPipe(['jpg', 'png']))
    file: Express.Multer.File,
    @Query('id') id: string,
  ) {
    const idNumber: number = Number(id);
    return this.rewardService.createImage(idNumber, file);
  }
}
