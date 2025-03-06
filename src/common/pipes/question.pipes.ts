import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateQuestionInput } from '../../question/dto/input/create-question.input';

@Injectable()
export class QuestionValidationPipe implements PipeTransform<any> {
  constructor() {}

  async transform(
    data: CreateQuestionInput,
    metadata: ArgumentMetadata,
  ): Promise<any> {
    if (!data.Answer) {
      throw new HttpException(
        'Нет ответов на задание.',
        HttpStatus.BAD_REQUEST,
      );
    }
    switch (data.typeMiniGameId) {
      case 3:
        break;
      case 4:
        if (data.Answer.length != 4) {
          throw new HttpException(
            'Должно быть 4 ответа.',
            HttpStatus.BAD_REQUEST,
          );
        }
        let countCorrectTrue = 0;
        for (var answer of data.Answer) {
          if (!(answer.correct == 'true' || answer.correct == 'false')) {
            throw new HttpException(
              'Ошибка поля correct.',
              HttpStatus.BAD_REQUEST,
            );
          } else if (answer.correct == 'true') countCorrectTrue++;
        }
        if (countCorrectTrue != 1)
          throw new HttpException(
            'Ошибка количества правильных ответов.',
            HttpStatus.BAD_REQUEST,
          );
        break;
      case 5:
        break;
      case 6:
        break;
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
