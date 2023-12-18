import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

// @Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String, { nullable: true }) // 이 부분이 commons/schema.gql 로 들어감.
  async fetchBoards(): Promise<string> {
    // 1. 캐시에서 조회하는 연습
    const myCache = await this.cacheManager.get('qqq');
    console.log(myCache);

    // 2. 조회 완료 메시지 전달
    return '캐시에서 조회 완료!!';
    // redis 연습을 위해서 잠시 주석 걸기
    // return this.boardsService.findAll();
  }

  @Mutation(() => String) // Docs 작성 부분
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('qqq', createBoardInput, {
      ttl: 5000,
    });
    // 2. 등록 완료 메시지 전달
    return '캐시에 등록 완료!!';

    // redis 연습을 위해서 잠시 주석 걸기!!
    // return this.boardsService.create({ createBoardInput });
  }
}
