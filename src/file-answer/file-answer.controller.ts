import { Body, Controller, Post, UploadedFile, UploadedFiles, UsePipes } from '@nestjs/common';
import { FileAnswerService } from './file-answer.service';
import { ApiManyFilesWithID, ApiOneFileWithID } from '../common/decorators/api-file.decorator';
import { FilesValidationPipe, FileValidationPipe } from '../common/pipes/file-validation.pipes';
import { FileAnswerFileUploadDto } from './output/response-file-upload.dto';

@Controller('file-answer')
export class FileAnswerController {
  constructor(private readonly fileAnswerService: FileAnswerService) {}

  @Post('upload-file')
  @ApiOneFileWithID()
  @UsePipes(new FileValidationPipe(['jpg', 'png']))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() id: number,
  ): Promise<FileAnswerFileUploadDto> {
    return this.fileAnswerService.create(file, id);
  }

  @Post('upload-files')
  @ApiManyFilesWithID()
  @UsePipes(new FilesValidationPipe(['jpg','png']))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() id: number,
  ): Promise<FileAnswerFileUploadDto[]> {
    return this.fileAnswerService.createMany(files, id);
  }
}
