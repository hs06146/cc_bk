import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  koName: string;

  @Field(() => String)
  enName: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  kcal: number;

  @Min(0)
  @Field(() => Int)
  mg: number;

  @Field(() => String)
  subCategoryId: string;

  @Field(() => [String])
  allergies: string[];
}
