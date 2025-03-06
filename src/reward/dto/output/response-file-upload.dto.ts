import { ApiProperty, PickType } from '@nestjs/swagger';
import { RewardModel } from '../../../reward/model/reward.model';

export class ResponseFileUploadDto extends PickType(RewardModel, [
  'id',
  'name',
  'url',
]) {
  @ApiProperty({ example: '1', description: 'Идентификатор файла' })
  id: number;

  @ApiProperty({ example: 'Орден "Победа"', description: 'Наименование награды' })
  name: string;

  @ApiProperty({
    example: '7ad01000-9a14-49be-a2e5-a248100a00e0.jpg',
    description: 'Имя файла',
  })
  url: string;
}
