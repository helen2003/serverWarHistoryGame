import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import {
  ApiManyFiles,
  ApiOneFile,
} from '../common/decorators/api-file.decorator';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import {
  FilesValidationPipe,
  FileValidationPipe,
} from '../common/pipes/file-validation.pipes';
import { PracticMaterialService } from './practic-material.service';

@Controller('practic-material')
export class PracticMaterialController {
  constructor(
    private readonly practicMaterialService: PracticMaterialService,
  ) {}

  @Post('upload-file')
  @ApiOneFile()
  @UsePipes(new FileValidationPipe(['jpg', 'png']))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseFileUploadDto> {
    return this.practicMaterialService.create(file);
  }

  @Post('upload-files')
  @ApiManyFiles()
  @UsePipes(new FilesValidationPipe(['jpg', 'png']))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ResponseFileUploadDto[]> {
    return this.practicMaterialService.createMany(files);
  }
}
