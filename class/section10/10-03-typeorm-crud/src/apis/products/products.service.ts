import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) // injectable의 역할
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    // nestjs 에서는 await을 쓰지 않아도 resolver 에서 return 하기 전에 끝나지 않은 동작을 기다림.
    const result = this.productsRepository.save({
      ...createProductInput,
      // 하나하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //   id: 'asdwdasdsadas'(uuid),
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // };
    return result;
  }
}
