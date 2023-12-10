import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('user') user: CreateUserInput, //
  ): Promise<User> {
    return this.usersService.create({ user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteLoginUser(
    @Args('id') id: string, //
  ): Promise<boolean> {
    return this.usersService.deleteLoginUser({ id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUser(
    @Args('email') email: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({ email, updateUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchLoginUser(
    @Args('email') email: string, //
  ): Promise<User> {
    return this.usersService.findOne({ email });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUserPwd(
    @Args('email') email: string, //
    @Args('password') password: string,
  ): Promise<User> {
    return this.usersService.updateUserPwd({ email, password });
  }
}
