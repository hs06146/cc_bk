import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';

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

  @Mutation(() => Boolean)
  deleteUser(
    @Args('userId') userId: string, //
  ): Promise<boolean> {
    return this.usersService.delete({ userId });
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({ id, updateUserInput });
  }

  @Query(() => User)
  fetchUser(
    @Args('id') id: string, //
  ): Promise<User> {
    return this.usersService.findOne({ id });
  }
}
