import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

// 인젝션-스코프 => 1. 싱글톤(new 한 번)으로 할래?
//               2. Request 스코프(매 요청마다 new)로 할래?
//               3. Transient 스코프(매 주입마다 new)로 할래?
@Injectable({ scope: Scope.DEFAULT }) // injection-scope, 싱글톤(new 1번하는거)으로 할래? Request 스코프(매 요청마다 new)로 할래?
export class BoardsService {
  findAll(): Board[] {
    // 1. Database 접속 후 데이터를 조회 ==> 데이터를 조회했다고 가정
    const result = [
      {
        number: 100,
        writer: '철수',
        title: '제목입니다~~',
        contents: '내용이에요',
      },
      {
        number: 200,
        writer: '영희',
        title: '영희입니다~~',
        contents: '영희예요',
      },
      {
        number: 300,
        writer: '훈이',
        title: '훈이입니다~~',
        contents: '훈이예요',
      },
    ];
    // 2. Database에서 꺼내온 결과를 브라우저에 응답(response) 주기
    return result;
  }
  // create(writer: string, title: string, contents: string): string {
  create({ createBoardInput }: IBoardsServiceCreate): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. DB에 접속 후, 데이터를 저장 ==> 데이터를 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저에 응답으로 주기
    return '게시물 등록에 성공하였습니다.';
  }
}
