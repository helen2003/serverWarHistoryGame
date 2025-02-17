import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TypeFileService } from './type-file.service';
import { TypeFileModel } from './model/type-mini-game.model';
import { TypeFile } from '@prisma/client';

@Resolver()
export class TypeFileResolver {
  constructor(private readonly typeFileService: TypeFileService) {}

  @Query(() => [TypeFileModel])
  getTypeFileAll(): Promise<TypeFile[]> {
    return this.typeFileService.findAll();
  }

  // Нельзя изменять данные

  // @Mutation(() => TypeFileModel)
  // createTypeFile(@Args('name') name: string): Promise<TypeFile> {
  //   return this.typeFileService.create(name);
  // }

  // @Mutation(() => TypeFileModel)
  // updateTypeFile(
  //   @Args('name') name: string,
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<TypeFile> {
  //   return this.typeFileService.update(id, name);
  // }

  // @Mutation(() => TypeFileModel)
  // deleteTypeFile(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<TypeFile> {
  //   return this.typeFileService.delete(id);
  // }
}
