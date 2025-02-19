import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export function writeFile(file: Express.Multer.File): string {
  try {
    let file_extension = file.originalname.slice(
      (Math.max(0, file.originalname.lastIndexOf('.')) || Infinity) + 1,
    );
    const fileName = uuid.v4() + `.${file_extension}`;
    const filePath = path.resolve(__dirname, '../..', 'static');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    return fileName;
  } catch (error) {
    throw new HttpException(
      'Ошибка при записи файла',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export function getTypeFile(mimetype: string): number {
  let mimeTypeFile = mimetype.split('/');
  switch (mimeTypeFile[0]) {
    case 'image':
      return 1;
    case 'video':
      return 2;
    case 'audio':
      return 3;
    case 'application':
      return 4;
  }
}
