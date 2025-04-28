import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
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
    UseInterceptors(FilesInterceptor('files')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
}

export function ApiOneFileTheoryMaretial() {
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
          description: {
            type: 'string',
          },
          usage: {
            type: 'string',
          },
          id: {
            type: 'string',
          },
        },
      },
    }),
  );
}

export function ApiManyFilesWithDescription() {
  return applyDecorators(
    ApiOperation({ summary: 'Загрузка нескольких файлов' }),
    ApiResponse({ status: 200, type: ResponseFileUploadDto, isArray: true }),
    UseInterceptors(FilesInterceptor('files')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          descriptions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    }),
  );
}

export function ApiOneFileWithIdQuery() {
  return applyDecorators(
    ApiOperation({ summary: 'Загрузка одного файла' }),
    ApiResponse({ status: 200, type: ResponseFileUploadDto }),
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiQuery({
      name: 'id',
    }),
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

export function ApiManyFilesWithIdQuery() {
  return applyDecorators(
    ApiOperation({ summary: 'Загрузка нескольких файлов' }),
    ApiResponse({ status: 200, type: ResponseFileUploadDto, isArray: true }),
    UseInterceptors(FilesInterceptor('files')),
    ApiConsumes('multipart/form-data'),
    ApiQuery({
      name: 'id',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
}
