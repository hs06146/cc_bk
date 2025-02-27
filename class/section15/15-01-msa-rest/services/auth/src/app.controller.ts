import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ cmd: 'login' })
  login(data) {
    // 로그인 진행
    console.log(data);
    return 'accessToken!!';
  }

  logout() {
    // 로그아웃 진행
    return 'logout!!';
  }

  restoreAccessToken() {
    // 토큰 재발급
  }
}
