import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './apis/products/products.module';
import { SubCategoriesModule } from './apis/subCategories/subCategories.module';
import { MainCategoriesModule } from './apis/mainCategories/mainCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    SubCategoriesModule,
    MainCategoriesModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: './.docker.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE, // 이건 미리 만들어주어야함.
      entities: [__dirname + '/apis/**/*.entity.*'], // typescript는 이후 js로 바뀌기 때문에 확장자를 js로 하거나 *로 한다.
      logging: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
