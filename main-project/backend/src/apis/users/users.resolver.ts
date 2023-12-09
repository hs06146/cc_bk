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
    @Args('id') id: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({ id, updateUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchLoginUser(
    @Args('id') id: string, //
  ): Promise<User> {
    return this.usersService.findOne({ id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUserPwd(
    @Args('id') id: string, //
    @Args('password') password: string,
  ): Promise<User> {
    return this.usersService.updateUserPwd({ id, password });
  }
}
