import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateQuestionInput } from '../../question/dto/input/create-question.input';

@Injectable()
export class QuestionCreateValidationPipe implements PipeTransform<any> {
  constructor() {}

  async transform(
    data: CreateQuestionInput,
    // metadata: ArgumentMetadata,
  ): Promise<any> {
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
        for (let answer of data.Answer) {
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
        if (data.Answer.length != 1) {
          throw new HttpException(
            'Должен быть 1 ответ.',
            HttpStatus.BAD_REQUEST,
          );
        }
        break;
      case 6:
        if (data.Answer.length <= 1) {
          throw new HttpException(
            'Должно быть более 1 ответа.',
            HttpStatus.BAD_REQUEST,
          );
        }
        break;
      case 7:
        if (data.Answer.length <= 1) {
          throw new HttpException(
            'Должно быть более 1 ответа.',
            HttpStatus.BAD_REQUEST,
          );
        }
        for (let answer of data.Answer) {
          if (answer.correct == null) {
            throw new HttpException(
              'Ошибка поля correct.',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
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
