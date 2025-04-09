import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { FileAnswerService } from './file-answer.service';
import {
  FilesValidationPipe,
  FileValidationPipe,
} from '../common/pipes/file-validation.pipes';
import { FileAnswerFileUploadDto } from './output/response-file-upload.dto';
import {
  ApiManyFilesWithIdQuery,
  ApiOneFileWithIdQuery,
} from 'src/common/decorators/api-file.decorator';

@Controller('file-answer')
export class FileAnswerController {
  constructor(private readonly fileAnswerService: FileAnswerService) {}

  @Post('upload-file')
  @ApiOneFileWithIdQuery()
  uploadFile(
    @UploadedFile(new FileValidationPipe(['jpg', 'png']))
    file: Express.Multer.File,
    @Query('id') id: string,
  ): Promise<FileAnswerFileUploadDto> {
    const idNumber: number = Number(id);
    return this.fileAnswerService.create(file, idNumber);
  }

  @Post('upload-files')
  @ApiManyFilesWithIdQuery()
  uploadFiles(
    @UploadedFiles(new FilesValidationPipe(['jpg', 'png']))
    files: Array<Express.Multer.File>,
    @Query('id') id: string,
  ): Promise<FileAnswerFileUploadDto[]> {
    const idNumber: number = Number(id);
    return this.fileAnswerService.createMany(files, idNumber);
  }
}
