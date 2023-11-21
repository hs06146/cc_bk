import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardsService,
  ],
})
export class BoardsModule {}
