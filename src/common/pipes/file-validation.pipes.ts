import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

function checkFile(
  file: Express.Multer.File,
  extensions: Array<string>,
): boolean {
  try {
    if (file.size <= 2097152) {
      let file_extension = file.originalname.slice(
        (Math.max(0, file.originalname.lastIndexOf('.')) || Infinity) + 1,
      );
      if (!extensions.includes(file_extension))
        throw new HttpException(
          'Недопустимое расширение файла.',
          HttpStatus.BAD_REQUEST,
        );
    } else {
      throw new HttpException(
        'Большой размер. Файл не должен превышать 2Мб.',
        HttpStatus.BAD_REQUEST,
      );
    }
  } catch (error) {
    throw new HttpException('Ошибка загрузки файла.', HttpStatus.BAD_REQUEST);
  }

  return true;
}

@Injectable()
export class FileValidationPipe implements PipeTransform<any> {
  constructor(private readonly extensions: Array<string>) {}

  async transform(
    file: Express.Multer.File,
    metadata: ArgumentMetadata,
  ): Promise<any> {
    checkFile(file, this.extensions);
    return file;
  }
}

@Injectable()
export class FilesValidationPipe implements PipeTransform<any> {
  constructor(private readonly extensions: Array<string>) {}
  async transform(
    files: Array<Express.Multer.File>,
    metadata: ArgumentMetadata,
  ): Promise<any> {
    for (var file of files) {
      checkFile(file, this.extensions);
    }
    return files;
  }
}
