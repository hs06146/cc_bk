import { Injectable, Scope } from '@nestjs/common';

// 인젝션-스코프 => 1. 싱글톤(new 한 번)으로 할래?
//               2. Request 스코프(매 요청마다 new)로 할래?
//               3. Transient 스코프(매 주입마다 new)로 할래?

@Injectable({ scope: Scope.DEFAULT }) // injection-scope, 싱글톤(new 1번하는거)으로 할래? Request 스코프(매 요청마다 new)로 할래?
export class BoardsService {
  getHello(): string {
    return 'Hello World!';
  }
}
