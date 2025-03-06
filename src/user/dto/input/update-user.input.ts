import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UserModel } from '../../model/users.model';

@InputType()
export class UpdateUserInput extends PickType(UserModel, [
  'login',
  'firstName',
  'name',
  'rankId',
]) {
  @Field()
  login: string;
}
