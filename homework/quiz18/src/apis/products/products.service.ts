import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceRestore,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { AllergiesService } from '../allergies/allergies.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly allergiesService: AllergiesService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['subCategory', 'allergies'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['subCategory', 'allergies'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { allergies, subCategoryId, ...newCreateProductInput } =
      createProductInput;
    const prevAllergies = await this.allergiesService.findByNames({
      allergies,
    });

    const temp = [];
    allergies.forEach((el) => {
      const isExist = prevAllergies.find((prevEl) => el === prevEl.name);
      if (!isExist) {
        temp.push({ name: el });
      }
    });
    const newAllergies = await this.allergiesService.bulkInsert({
      names: temp,
    });
    const afterAllergies = [...prevAllergies, ...newAllergies.identifiers];

    return this.productRepository.save({
      ...newCreateProductInput,
      subCategory: {
        id: subCategoryId,
      },
      allergies: afterAllergies,
    });
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });

    const { allergies, subCategoryId, ...newUpdateProductInput } =
      updateProductInput;
    const prevAllergies = await this.allergiesService.findByNames({
      allergies,
    });

    const temp = [];
    allergies.forEach((el) => {
      const isExist = prevAllergies.find((prevEl) => el === prevEl.name);
      if (!isExist) {
        temp.push({ name: el });
      }
    });
    const newAllergies = await this.allergiesService.bulkInsert({
      names: temp,
    });
    const afterAllergies = [...prevAllergies, ...newAllergies.identifiers];

    return this.productRepository.save({
      ...product,
      ...newUpdateProductInput,
      subCategory: {
        id: subCategoryId,
      },
      allergies: afterAllergies,
    });
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }: IProductsServiceRestore): Promise<boolean> {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }

  findProductsWithDeleted(): Promise<Product[]> {
    return this.productRepository.find({ withDeleted: true });
  }
}
