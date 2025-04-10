import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { TheoryMaterialService } from './theory-material.service';
import {
  ApiManyFilesWithDescription,
  ApiOneFileWithDescription,
} from '../common/decorators/api-file.decorator';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import {
  FilesValidationPipe,
  FileValidationPipe,
} from '../common/pipes/file-validation.pipes';
import {
  FileExtenderDescription,
  FilesExtenderDescription,
} from 'src/common/interceptors/fileExtenderDescription';

@Controller('theory-material')
export class TheoryMaterialController {
  constructor(private readonly theoryMaterialService: TheoryMaterialService) {}

  @Post('upload-file')
  @UseInterceptors(FileExtenderDescription)
  @ApiOneFileWithDescription()
  @UsePipes(new FileValidationPipe(['mp3', 'mp4', 'jpg', 'epub', 'png']))
  uploadFile(
    @UploadedFile() file: Express.Multer.File & { description: string },
  ): Promise<ResponseFileUploadDto> {
    return this.theoryMaterialService.create(file);
  }

  @Post('upload-files')
  @UseInterceptors(FilesExtenderDescription)
  @ApiManyFilesWithDescription()
  @UsePipes(new FilesValidationPipe(['mp3', 'mp4', 'jpg', 'epub', 'png']))
  uploadFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File & { description: string }>,
  ): Promise<ResponseFileUploadDto[]> {
    return this.theoryMaterialService.createMany(files);
  }
}
