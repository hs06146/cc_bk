import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') // app.module에서 ClientsModule 에 설정한 name
    private readonly clientAuthService: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/auth/login')
  login() {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { cmd: 'login' },
      { email: 'a@a.com', password: '1234' }, // args 전달
    );
  }

  @Get('/boards')
  fetchBoards() {
    // resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send(
      { cmd: 'fetchBoards' }, //
      {},
    );
  }
}
