import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

// @Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => String)
  getHello(): string {
    return this.boardsService.getHello();
  }
}
