import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  login(
    @Args('userId') userId: string,
    @Args('password') password: string,
  ): Promise<string> {
    return this.authService.login({ userId, password });
  }
}
