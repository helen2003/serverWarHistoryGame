import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/users.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ValidateUser } from 'src/common/decorators/dto/validate-user.dto';
import { Rank, RoleEnum, User } from '@prisma/client';
import { UpdateUserInput } from './dto/input/update-user.input';
import { RankService } from 'src/rank/rank.service';
import { RankModel } from 'src/rank/model/rank.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private rankService: RankService,
  ) {}

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @CurrentUser() user: ValidateUser,
    @Args('updateUserData') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(user, updateUserInput);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @CurrentUser() user: ValidateUser,
    @Args('password', { type: () => String }) password: string,
  ): Promise<User> {
    return this.userService.updatePassword(user, password);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  updateRole(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('role', { type: () => String }) role: RoleEnum,
  ): Promise<User> {
    return this.userService.updateRole(userId, role);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  deleteAccount(@CurrentUser() user: ValidateUser): Promise<User> {
    return this.userService.delete(user);
  }

  @ResolveField('Rank', () => RankModel)
  getRank(@Parent() user: UserModel): Promise<Rank> {
    const { rankId } = user;
    return this.rankService.findOne(rankId);
  }
}
