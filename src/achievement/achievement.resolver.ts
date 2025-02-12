import { Resolver } from '@nestjs/graphql';
import { AchievementService } from './achievement.service';

@Resolver()
export class AchievementResolver {
  constructor(private readonly achievementService: AchievementService) {}
}
