import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { TheoryMaterialService } from './theory-material.service';
import {
  ApiManyFiles,
  ApiOneFile,
} from '../common/decorators/api-file.decorator';
import { ResponseFileUploadDto } from './dto/output/response-file-upload.dto';
import { FilesValidationPipe, FileValidationPipe } from '../common/pipes/file-validation.pipes';

@Controller('theory-material')
export class TheoryMaterialController {
  constructor(private readonly theoryMaterialService: TheoryMaterialService) {}

  // @Post('upload-file')
  // @ApiOneFile()
  // @UsePipes(new FileValidationPipe(['mp3', 'mp4', 'jpg', 'epub', 'png']))
  // uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<ResponseFileUploadDto> {
  //   return this.theoryMaterialService.create(file);
  // }

  @Post('upload-file')
  @ApiOneFile()
  @UsePipes(new FileValidationPipe(['mp3', 'mp4', 'jpg', 'epub', 'png']))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() description: string
  ): Promise<ResponseFileUploadDto> {
    console.log(description)
    return this.theoryMaterialService.create(file, description);
  }

  // @Post('upload-files')
  // @ApiManyFiles()
  // @UsePipes(new FilesValidationPipe(['mp3', 'mp4', 'jpg', 'epub', 'png']))
  // uploadFiles(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ): Promise<ResponseFileUploadDto[]> {
  //   return this.theoryMaterialService.createMany(files);
  // }
}
