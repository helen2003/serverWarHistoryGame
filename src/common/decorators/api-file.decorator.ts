import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseFileUploadDto } from './dto/response-file-upload.dto';


export function ApiOneFile() {
  return applyDecorators(
    ApiOperation({ summary: 'Загрузка одного файла' }),
    ApiResponse({ status: 200, type: ResponseFileUploadDto }),
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}

export function ApiManyFiles() {
  return applyDecorators(
    ApiOperation({ summary: 'Загрузка нескольких файлов' }),
    ApiResponse({ status: 200, type: ResponseFileUploadDto, isArray: true }),
    UseInterceptors(FilesInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    })
  );
}
