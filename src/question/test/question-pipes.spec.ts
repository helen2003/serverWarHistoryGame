import { QuestionCreateValidationPipe } from '../../common/pipes/question-create.pipes';
import {
  ErrorIncorrectFieldFilling,
  ErrorLenghtAnwser_4,
  ErrorMiniGameValues,
  ErrorNumberCorrectAnswers,
  questionReqIncorrectField_1,
  questionReqTrue,
  questionReqWrongLenghtAnwser_3,
  questionReqWrongNumberCorrectAnswers,
  questionReqWrongTypeMiniGame,
} from './data';

describe('QuestionValidationPipe', () => {
  let pipe: QuestionCreateValidationPipe;

  beforeEach(() => {
    pipe = new QuestionCreateValidationPipe();
  });

  it('should be defined', () => {
    expect(new QuestionCreateValidationPipe()).toBeDefined();
  });

  it(`should return the data unchanged`, async () => {
    const value = () => pipe.transform(questionReqTrue);
    expect(await value()).toEqual(questionReqTrue);
  });

  it(`should return an error value`, async () => {
    const value = () => pipe.transform(questionReqWrongTypeMiniGame);
    await expect(value()).rejects.toEqual(ErrorMiniGameValues);
  });

  describe(`Type Mini-game 4`, () => {
    it(`should return an error length`, async () => {
      const value = () => pipe.transform(questionReqWrongLenghtAnwser_3);
      await expect(value()).rejects.toEqual(ErrorLenghtAnwser_4);
    });

    it(`should return an error about incorrect field filling`, async () => {
      const value = () => pipe.transform(questionReqIncorrectField_1);
      await expect(value()).rejects.toEqual(ErrorIncorrectFieldFilling);
    });

    it(`should return an error number correct answers`, async () => {
      const value = () => pipe.transform(questionReqWrongNumberCorrectAnswers);
      await expect(value()).rejects.toEqual(ErrorNumberCorrectAnswers);
    });
  });
});
