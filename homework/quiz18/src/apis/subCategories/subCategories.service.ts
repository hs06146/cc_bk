import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>, //
  ) {}

  findAll(): Promise<SubCategory[]> {
    return this.subCategoryRepository.find({
      relations: ['mainCategory'],
    });
  }

  create({ createSubCategoryInput }): Promise<SubCategory> {
    const { mainCategoryId, ...subCategoryInput } = createSubCategoryInput;
    return this.subCategoryRepository.save({
      mainCategory: {
        id: mainCategoryId,
      },
      ...subCategoryInput,
    });
  }
}
