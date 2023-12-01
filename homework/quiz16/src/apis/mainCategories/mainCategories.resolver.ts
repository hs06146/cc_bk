import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainCategoriesService } from './mainCategories.service';
import { MainCategory } from './entities/mainCategory.entity';

@Resolver()
export class MainCategoriesResolver {
  constructor(
    private readonly mainCategoriesService: MainCategoriesService, //
  ) {}

  @Query(() => [MainCategory])
  fetchMainCategories(): Promise<MainCategory[]> {
    return this.mainCategoriesService.findAll();
  }

  @Mutation(() => MainCategory)
  createMainCategory(@Args('name') name: string): Promise<MainCategory> {
    return this.mainCategoriesService.create({ name });
  }
}
