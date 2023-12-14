import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSalesLocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entites/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() // One To One(1:1) 관계에서는 중심이 되는 Entity에 JoinColumn 데코레이션을 추가해주어야 함.
  @OneToOne(() => ProductSalesLocation) // 1:1 연결인데 ProductSalesLocation 테이블이랑 연결할거야. OneToOne : Product To ProductSalesLocation
  @Field(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory) // Many: Product, One: ProductCategory
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User) // Many: Product, One: User
  @Field(() => User)
  user: User;

  // ManyToMany 는 연결되는 두 테이블 모두에 추가해주어야 함.
  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 첫번째 인자는 어느 테이블과 연결되는지, 두번째 인자는 상대 테이블이 나를 뭐라 지칭하는지
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  // @CreateDateColumn() // 데이터 등록 시 등록 시간 자동으로 추가
  // createdAt: Date;

  // @UpdateDateColumn() // 데이터 수정 시 수정 시간 자동으로 추가
  // updatedAt: Date;

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위함
  deletedAt: Date;
}
