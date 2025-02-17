import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { TheoryMaterialService } from './theory-material.service';
import {
  ApiManyFiles,
  ApiOneFile,
} from 'src/common/decorators/api-file.decorator';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import {
  FilesValidationPipe,
  FileValidationPipe,
} from 'src/common/pipes/file-validation.pipes';

@Controller('theory-material')
export class TheoryMaterialController {
  constructor(private readonly theoryMaterialService: TheoryMaterialService) {}

  @Post('upload-file')
  @ApiOneFile()
  @UsePipes(FileValidationPipe)
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseFileUploadDto> {
    return this.theoryMaterialService.create(file);
  }

  @Post('upload-files')
  @ApiManyFiles()
  @UsePipes(FilesValidationPipe)
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ResponseFileUploadDto[]> {
    return this.theoryMaterialService.createMany(files);
  }
}
