import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ProductTag } from './entities/productTag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductTagsServiceFindByNames,
  IProductsTagsServiceBulkInsert,
} from './interfaces/products-tags-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findByNames({ tagNames }: IProductTagsServiceFindByNames) {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
    return this.productsTagsRepository.insert(names); // bulk-insert(배열이 들어갔을 때 배열에 들어간 내용이 한 번에 저장됨)
  }
}
