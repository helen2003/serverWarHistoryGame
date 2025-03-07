import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class AuthUserDto extends PickType(CreateUserDto, [
  'login',
  'password',
]) {}
