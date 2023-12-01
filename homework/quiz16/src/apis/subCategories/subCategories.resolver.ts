import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubCategoriesService } from './subCategories.service';
import { SubCategory } from './entities/subCategory.entity';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';

@Resolver()
export class SubCategoriesResolver {
  constructor(
    private readonly subCategoriesService: SubCategoriesService, //
  ) {}

  @Query(() => [SubCategory])
  fetchSubCategories(): Promise<SubCategory[]> {
    return this.subCategoriesService.findAll();
  }

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ): Promise<SubCategory> {
    return this.subCategoriesService.create({ createSubCategoryInput });
  }
}
