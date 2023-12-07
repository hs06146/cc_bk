import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoriesResolver } from './subCategories.resolver';
import { SubCategoriesService } from './subCategories.service';
import { SubCategory } from './entities/subCategory.entity';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubCategory, //
      MainCategory,
    ]),
  ],
  providers: [
    SubCategoriesResolver, //
    SubCategoriesService,
  ],
})
export class SubCategoriesModule {}
