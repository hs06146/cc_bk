import { Mutation, Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login(): string {
    return 'accessToken';
  }

  @Query(() => String)
  aaa(): string {
    return 'aaa';
  }
}
