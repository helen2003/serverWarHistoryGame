import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class RegistationDto extends PickType(CreateUserDto, [
  'login',
  'password',
  'firstName',
  'name',
]) {}
