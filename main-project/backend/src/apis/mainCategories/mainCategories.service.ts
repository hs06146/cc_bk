import { Injectable } from '@nestjs/common';
import { MainCategory } from './entities/mainCategory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMainCategoriesServiceCreate } from './interfaces/main-categories-service.interface';

@Injectable()
export class MainCategoriesService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategory: Repository<MainCategory>, //
  ) {}

  findAll(): Promise<MainCategory[]> {
    return this.mainCategory.find();
  }

  create({ name }: IMainCategoriesServiceCreate): Promise<MainCategory> {
    return this.mainCategory.save({ name });
  }
}
