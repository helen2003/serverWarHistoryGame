import { Resolver } from '@nestjs/graphql';
import { RewardService } from './reward.service';

@Resolver()
export class RewardResolver {
  constructor(private readonly rewardService: RewardService) {}
}
