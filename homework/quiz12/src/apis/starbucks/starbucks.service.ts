import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  findAll(): string {
    return '스타벅스 커피 목록을 조회합니다.';
  }
}
