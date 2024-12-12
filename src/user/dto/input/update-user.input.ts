import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { UserModel } from 'src/user/model/users.model';
// import { User } from 'src/users/model/users.model';

@InputType()
export class UpdateUserInput extends PickType(UserModel, [
  'login',
  'firstName',
  'name',
]) {
  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  login: string;

  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @Field({ nullable: true })
  @IsString({ message: 'Должно быть строкой' })
  name: string;
}
