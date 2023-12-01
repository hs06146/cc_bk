import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergiesService } from '../allergies/allergies.service';
import { Allergy } from '../allergies/entities/allergy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      Allergy,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    AllergiesService,
  ],
})
export class ProductsModule {}
