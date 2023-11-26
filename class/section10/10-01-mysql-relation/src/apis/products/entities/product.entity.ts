import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSalesLocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldout: boolean;

  @JoinColumn() // One To One(1:1) 관계에서는 중심이 되는 Entity에 JoinColumn 데코레이션을 추가해주어야 함.
  @OneToOne(() => ProductSalesLocation) // 1:1 연결인데 ProductSalesLocation 테이블이랑 연결할거야. OneToOne : Product To ProductSalesLocation
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory) // Many: Product, One: ProductCategory
  productCategory: ProductCategory;

  @ManyToOne(() => User) // Many: Product, One: User
  user: User;

  // ManyToMany 는 연결되는 두 테이블 모두에 추가해주어야 함.
  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 첫번째 인자는 어느 테이블과 연결되는지, 두번째 인자는 상대 테이블이 나를 뭐라 지칭하는지
  productTags: ProductTag[];
}
