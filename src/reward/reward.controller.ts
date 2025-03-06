import { Body, Controller, Post, UploadedFile, UsePipes } from '@nestjs/common';
import { ApiOneFile } from '../common/decorators/api-file.decorator';
import { FileValidationPipe } from '../common/pipes/file-validation.pipes';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('upload-file')
  @ApiOneFile()
  @UsePipes(new FileValidationPipe(['jpg', 'png']))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() id: number,
  ): Promise<ResponseFileUploadDto> {
    return this.rewardService.createImage(id, file);
  }
}
