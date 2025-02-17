import { Resolver } from '@nestjs/graphql';
import { ResponceTemplateService } from './responce-template.service';

@Resolver()
export class ResponceTemplateResolver {
  constructor(private readonly responceTemplateService: ResponceTemplateService) {}
}
