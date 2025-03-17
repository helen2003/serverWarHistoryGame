import { HttpException, HttpStatus } from '@nestjs/common';

export const questionReqTrue = {
  text: 'План войны гитлеровской Германии против СССР был утверждён в:',
  topicId: 1,
  typeMiniGameId: 4,
  typeTaskId: 4,
  Answer: [
    {
      text: '1940',
      correct: 'true',
    },
    {
      text: '1933',
      correct: 'false',
    },
    {
      text: '1939',
      correct: 'false',
    },
    {
      text: '1941',
      correct: 'false',
    },
  ],
};

export const questionResTrue = {
  id: 1,
  text: 'План войны гитлеровской Германии против СССР был утверждён в:',
  topicId: 1,
  typeTaskId: 4,
  typeMiniGameId: 4,
  scaleImportantId: null,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const questionReqWrongTypeMiniGame = {
  text: 'План войны гитлеровской Германии против СССР был утверждён в:',
  topicId: 1,
  typeMiniGameId: 10,
  typeTaskId: 4,
  Answer: [
    {
      text: '1940',
      correct: 'true',
    },
    {
      text: '1933',
      correct: 'false',
    },
    {
      text: '1939',
      correct: 'false',
    },
    {
      text: '1941',
      correct: 'false',
    },
  ],
};

export const questionReqWrongLenghtAnwser_3 = {
  text: 'План войны гитлеровской Германии против СССР был утверждён в:',
  topicId: 1,
  typeMiniGameId: 4,
  typeTaskId: 4,
  Answer: [
    {
      text: '1940',
      correct: 'true',
    },
    {
      text: '1933',
      correct: 'false',
    },
    {
      text: '1939',
      correct: 'false',
    },
  ],
};

export const questionReqIncorrectField_1 = {
  text: 'План войны гитлеровской Германии против СССР был утверждён в:',
  topicId: 1,
  typeMiniGameId: 4,
  typeTaskId: 4,
  Answer: [
    {
      text: '1940',
      correct: '',
    },
    {
      text: '1933',
      correct: 'false',
    },
    {
      text: '1939',
      correct: 'false',
    },
    {
      text: '1941',
      correct: 'false',
    },
  ],
};

export const questionReqWrongNumberCorrectAnswers = {
  text: 'План войны гитлеровской Германии против СССР был утверждён в:',
  topicId: 1,
  typeMiniGameId: 4,
  typeTaskId: 4,
  Answer: [
    {
      text: '1940',
      correct: 'true',
    },
    {
      text: '1933',
      correct: 'false',
    },
    {
      text: '1939',
      correct: 'false',
    },
    {
      text: '1941',
      correct: 'true',
    },
  ],
};

export const ErrorMiniGameValues = new HttpException(
  'Ошибка значения мини-игры.',
  HttpStatus.BAD_REQUEST,
);

export const ErrorLenghtAnwser_4 = new HttpException(
  'Должно быть 4 ответа.',
  HttpStatus.BAD_REQUEST,
);

export const ErrorIncorrectFieldFilling = new HttpException(
  'Ошибка поля correct.',
  HttpStatus.BAD_REQUEST,
);

export const ErrorNumberCorrectAnswers = new HttpException(
  'Ошибка количества правильных ответов.',
  HttpStatus.BAD_REQUEST,
);
