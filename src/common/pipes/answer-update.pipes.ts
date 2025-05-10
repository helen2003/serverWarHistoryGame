import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UpdateAnswerInput } from 'src/answer/dto/input/update-answer.input';

@Injectable()
export class AnswerUpdateValidationPipe implements PipeTransform<any> {
  constructor() {}

  async transform(
    data: UpdateAnswerInput,
    // metadata: ArgumentMetadata,
  ): Promise<any> {
    switch (data.typeMiniGameId) {
      case 4:
        if (data.answerData.length != 4) {
          throw new HttpException(
            'Ошибка количества ответов.',
            HttpStatus.BAD_REQUEST,
          );
        }
        break;
      case 5:
      case 3:
      case 6:
      case 7:
        break;
      default:
        throw new HttpException(
          'Ошибка значения мини-игры.',
          HttpStatus.BAD_REQUEST,
        );
    }

    return data;
  }
}
