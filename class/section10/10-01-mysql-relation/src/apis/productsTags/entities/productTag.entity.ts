import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // ManyToMany 는 연결되는 두 테이블 모두에 추가해주어야 함.
  @ManyToMany(() => Product, (products) => products.productTags) // 첫번째 인자는 어느 테이블과 연결되는지, 두번째 인자는 상대 테이블이 나를 뭐라 지칭하는지
  products: Product[];
}
