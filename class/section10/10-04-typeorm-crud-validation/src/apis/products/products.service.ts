import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
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

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.create(); // DB 접속이랑 관련 없음. 등록을 위해서 빈 객체 하나 만들기 위함
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정 방법

    // 기존에 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!
    this.checkSoldout({ product });

    const result = this.productsRepository.save({
      // id: productId,
      // isSoldout: product.isSoldout,
      // name: updateProductInput.name,
      // description: updateProductInput.description,
      // price: updateProductInput.price,
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
      ...updateProductInput,
    });

    return result;
  }

  // checkSoldout을 함수로 만드는 이유 => 수정 시, 삭제 시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout === true) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
