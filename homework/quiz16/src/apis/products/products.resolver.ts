import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string): Promise<boolean> {
    return this.productsService.delete({ productId });
  }

  @Mutation()
  restoreProduct(@Args('productId') productId: string): Promise<boolean> {
    return this.productsService.restore({ productId });
  }

  @Mutation()
  fetchProductsWithDeleted(): Promise<Product[]> {
    return this.productsService.findProductsWithDeleted();
  }
}
