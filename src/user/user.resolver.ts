import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './model/users.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ValidateUser } from '../common/decorators/dto/validate-user.dto';
import { Achievement, Rank, RoleEnum, User } from '@prisma/client';
import { UpdateUserInput } from './dto/input/update-user.input';
import { RankService } from '../rank/rank.service';
import { RankModel } from '../rank/model/rank.model';
import { AchievementModel } from '../achievement/model/achievement.model';
import { AchievementService } from '../achievement/achievement.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private rankService: RankService,
    private achievementService: AchievementService,
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

  @Query(() => UserModel)
  getUserOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @ResolveField('Rank', () => RankModel, { nullable: true })
  getRank(@Parent() user: UserModel): Promise<Rank | null> {
    const { rankId } = user;
    return this.rankService.findOne(rankId);
  }

  @ResolveField('Achievement', () => [AchievementModel], { nullable: 'itemsAndList' })
  getAchievment(@Parent() user: UserModel): Promise<Achievement[]> {
    const { id } = user;
    return this.achievementService.findAll({ rewardId: null, userId: id });
  }
}
