import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSalesLocation.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) // injectable의 역할
    private readonly productsRepository: Repository<Product>, //
    private readonly productsSalesLocationsService: ProductsSalesLocationsService,

    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSalesLocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // nestjs 에서는 await을 쓰지 않아도 resolver 에서 return 하기 전에 끝나지 않은 동작을 기다림.
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // 하나하나 직접 나열하는 방식
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1. 상품 거래 위치 등록
    const result = await this.productsSalesLocationsService.create({
      productSalesLocation,
    }); // 서비스를 타고 가야 하는 이유는...?
    // 레파지토리에 직접 접근하면 검증 로직을 통일 시킬 수 없음!

    // 2-2. 상품 태그 등록
    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"]

    const prevTags = await this.productsTagsService.findByNames({ tagNames }); // [{id: "전자제품ID", name: "전자제품"}]

    const temp = []; // [{name: "영등포"}, {name: "컴퓨터"}]
    tagNames.forEach((el) => {
      const isExist = prevTags.find((prevEl) => el === prevEl.name); // prevEl? 전자제품
      if (!isExist) {
        temp.push({ name: el });
      }
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp });
    const tags = [...prevTags, ...newTags.identifiers]; // [{id: "전자제품ID"}, {id: "영등포ID"}, {id: "컴퓨터ID"}]

    const result2 = this.productsRepository.save({
      ...product,
      productSalesLocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약 name 까지 받고 싶으면?
        // => createProductInput에 name까지 포함해서 받아오기
      },
      productTags: tags,
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const { productTags, ...newUpdateProductInput } = updateProductInput;
    // }: IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.create(); // DB 접속이랑 관련 없음. 등록을 위해서 빈 객체 하나 만들기 위함
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정 방법

    // 기존에 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!
    this.checkSoldout({ product });

    // 숙제1) 왜 아래 에러가 발생하는지 고민해보기
    // 숙제2) 아래 에러 고쳐보기

    const tagNames = productTags.map((el) => el.replace('#', ''));
    const prevTags = await this.productsTagsService.findByNames({ tagNames }); // [{id: "전자제품ID", name: "전자제품"}]

    const temp = []; // [{name: "영등포"}, {name: "컴퓨터"}]
    tagNames.forEach((el) => {
      const isExist = prevTags.find((prevEl) => el === prevEl.name); // prevEl? 전자제품
      if (!isExist) {
        temp.push({ name: el });
      }
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp });
    const tags = [...prevTags, ...newTags.identifiers];

    const result = this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
      ...newUpdateProductInput,
      productTags: tags,
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

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({id: productId}, {isDeleted: true})

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({id: productId}, {deletedAt: new Date()})

    // 4. 소프트 삭제 - TypeORM 제공, softRemove
    // 장점: 배열을 사용하여 여러 id를 한 번에 지우기 가능. ex) .softRemove([{id:qqq}, {id:aaa}, {id:zzz}])
    // 단점: id로만 삭제 가능.
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제 - TypeORM 제공, softDelete
    // 장점: 다른 컬럼으로 삭제 가능
    // 단점: 여러 id를 한 번에 지우기 불가능
    // 이게 작동하려면 deletedAt 컬럼은 추가해주어야 함.
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

interface IProductsServiceDelete {
  productId: string;
}
