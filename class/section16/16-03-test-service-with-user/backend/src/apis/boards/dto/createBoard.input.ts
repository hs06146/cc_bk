import { Field, InputType } from '@nestjs/graphql';

@InputType() // Input, argument에는 InputType 사용
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
