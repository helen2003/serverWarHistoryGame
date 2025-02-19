import { Body, Controller, Post, UploadedFile, UsePipes } from '@nestjs/common';
import { FileAnswerService } from './file-answer.service';
import { ApiOneFile } from 'src/common/decorators/api-file.decorator';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipes';
import { FileAnswerFileUploadDto } from './output/response-file-upload.dto';

@Controller('file-answer')
export class FileAnswerController {
  constructor(private readonly fileAnswerService: FileAnswerService) {}

  @Post('upload-file')
  @ApiOneFile()
  @UsePipes(new FileValidationPipe(['jpg', 'png']))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() answerId: number,
  ): Promise<FileAnswerFileUploadDto> {
    return this.fileAnswerService.create(file, answerId);
  }
}
